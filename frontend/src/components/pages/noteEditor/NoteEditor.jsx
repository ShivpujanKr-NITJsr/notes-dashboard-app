import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { X } from "lucide-react";
import { api } from "../../../utils";
import keyword_extractor from "keyword-extractor";

const NoteEditor = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean'],
    ],
  };
  

  const fetchNote = async () => {
    if (id) {
      const note = await api.notes.getNoteById({ id });
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags?.join(", ") || "");
    }
  };

  const generateTagSuggestions = (text) => {
    const rawKeywords = keyword_extractor.extract(text, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    });

    const top2 = rawKeywords.slice(0, 2);
    setSuggestedTags(top2);
  };

  const saveNote = async () => {
    const payload = {
      title,
      content,
      tags: tags.split(",").map((t) => t.trim()),
    };

    try {
      if (id) {
        payload.id = id;
        await api.notes.update(payload);
        alert("Note updated successfully");
        navigate("/");
      } else {
        await api.notes.createNote(payload);
        alert("Note created successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const closeEditor = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-[#1e1e1e] text-[#ccc] shadow-md rounded mt-10 relative">
      {/* Close Icon */}
      <button
        className="absolute top-2 right-2 w-6 h-6 bg-[#444] text-white rounded-full flex items-center justify-center cursor-pointer"
        onClick={closeEditor}
      >
        <X size={20} />
      </button>

      <h2 className="text-xl font-semibold mb-4">{id ? "Edit Note" : "Create Note"}</h2>

      <input
        className="w-full p-3 border border-[#444] bg-[#2a2a2a] text-[#ccc] rounded mb-4 placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="mb-4">
      <ReactQuill
  value={content}
  onChange={(value) => {
    setContent(value);
    generateTagSuggestions(value);
  }}
  theme="snow"
  modules={modules}
/>

      </div>

      <input
        className="w-full p-3 border border-[#444] bg-[#2a2a2a] text-[#ccc] rounded mb-2 placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      {/* Suggested Tags */}
      {suggestedTags.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-1">Suggested Tags:</p>
          <div className="flex gap-2 flex-wrap">
            {suggestedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  const current = tags.split(",").map((t) => t.trim());
                  if (!current.includes(tag)) {
                    setTags((prev) => (prev ? `${prev}, ${tag}` : tag));
                  }
                }}
                className="px-2 py-1 bg-blue-700 text-white text-xs rounded hover:bg-blue-800"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={saveNote}
      >
        {id ? "Update" : "Save"} Note
      </button>
    </div>
  );
};

export default NoteEditor;
