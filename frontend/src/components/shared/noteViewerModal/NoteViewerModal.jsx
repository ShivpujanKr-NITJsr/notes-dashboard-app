import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { api } from "../../../utils";
import "./noteviewer.css";

const NoteViewer = ({ id, setShowModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [note, setNote] = useState({});

  const getNote = async () => {
    if (id) {
      const note = await api.notes.getNoteById({ id });
      setNote(note);
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags?.join(", ") || "");
    }
  };

  useEffect(() => {
    getNote();
  }, [id]);

  return (
    <div class="note-viewer">
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#1e1e1e] text-[#ccc] max-w-xl w-full rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[80vh]">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-2 right-2 text-[#aaa] cursor-pointer hover:text-white text-xl font-bold"
          >
            ×
          </button>

          <div className="p-6 max-w-3xl mx-auto bg-[#1e1e1e] text-[#ccc] shadow-md rounded mt-10">
            <h2 className="text-xl font-semibold mb-4">Note</h2>

            {/* Title */}
            <div className="w-full p-3 bg-[#2a2a2a] text-[#ccc] rounded mb-4">
              <h3 className="font-semibold">{title}</h3>
            </div>

            {/* React Quill Content - Read-Only Mode */}
            <div className="mb-4">
              <ReactQuill
                value={content}
                readOnly={true} // Ensuring it's read-only
                theme="snow"
                modules={{ toolbar: [] }} // Hide toolbar
                className="border-none bg-[#2a2a2a] text-[#ccc] rounded" // No border, styled for viewing
              />
            </div>

            {/* Tags */}
            <div className="w-full p-3 bg-[#2a2a2a] text-[#ccc] rounded mb-4">
              <span>{tags}</span>
            </div>
            {note && note.createdAt && note.updatedAt && (
              <>
                <div className="mt-2 flex justify-between text-xs text-blue-400">
                  <p>createdAt</p>
                  <p>{note.createdAt}</p>
                </div>
                <div className="mt-2 flex justify-between text-xs text-blue-400">
                  <p>updatedAt</p>
                  <p>{note.updatedAt}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteViewer;
