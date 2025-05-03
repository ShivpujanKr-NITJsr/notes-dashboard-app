import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Paginated } from "../../shared/pagination/Paginated";
import NoteViewer from "../../shared/noteViewerModal/NoteViewerModal";
import { ConfirmationDialog } from "../../shared/confirmationDialog/confirmationDialog";
import { useMediaQuery } from "@mantine/hooks";
import { getLimit } from "../../../utils/pagination/getLimit";
import { useAuthContext } from "../../../context/AuthContext";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null); // Store the note to be deleted

  const [firstTime,setFirstTime]=useState(true)
  const navigate = useNavigate();
  const { user, login } = useAuthContext();
  console.log("user", user);

  const xl = useMediaQuery("(min-width: 1280px)");
  const lg = useMediaQuery("(min-width: 1024px)");
  const md = useMediaQuery("(min-width: 768px)");
  const sm = useMediaQuery("(min-width: 640px)");
  const xs = useMediaQuery("(min-width: 480px)");
  // console.log(xs,sm,md,lg,xl)

  const limit = getLimit(xl, lg, md, sm, xs);
  const pageSize = limit; // Set the page size based on the screen size

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>/g, "");
  };

  const getAllNotes = async () => {
    const notes = await api.notes.getAllNotes();
    setNotes(notes);
    setTotal(notes.length);
  };

  const deleteNote = async () => {
    try {
      const deleted = await api.notes.delete({ id: noteToDelete }); // Delete note by ID
      if (deleted) {
        setNotes(notes.filter((note) => note._id !== noteToDelete)); // Remove deleted note from UI
        setShowDeleteConfirmation(false); // Close the confirmation modal
        alert("Note deleted successfully");
      } else {
        alert("Failed to delete note. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowDeleteConfirmation(false); // Close the modal
  };

  useEffect(() => {
    if (user.isFirstLogin & firstTime) {
      const driverObj = driver({
        showProgress: true,
        steps: [
          {
            element: "#create-note",
            popover: {
              title: "Create Note",
              description:
                "Clicking this button will open a modal where you can create youre note and then save.",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#notes-grid",
            popover: {
              title: "Dashboard",
              description:
                "This is Your Dashboard which shows all your notes. click on any note and it will show details of that note. hovering over any note will show you the action icons to update, delete and view the note.",
              side: "top",
              align: "start",
            },
          },
          {
            element: "#pagination-notes",
            popover: {
              title: "it will show you the pagination of your notes.",
              description:
                "you can click on any page number to go to that page.",
              side: "top",
              align: "left",
            },
          },
          {
            element: "#next-page",
            popover: {
              title: "Get next list of notes in dashboard",
              description: "Click to go to next page",
              side: "right",
              align: "start",
            },
          },
          {
            element: "#prev-page",
            popover: {
              title: "Get prev list of notes in dashboard",
              description: "Click to go to prev page",
              side: "top",
              align: "start",
            },
          },
          {
            element: "#search-notes",
            popover: {
              title: "Search Notes By title or tags",
              description:
                "You can filter the notes of dashboard by tags or content by typing here",
              side: "right",
              align: "start",
            },
          },
          {
            popover: {
              title: "Great!",
              description:
                "And that is all, go ahead and start creating Notes .",
            },
          },
        ],
        onDestroyed: async () => {
          try {
            // ✅ Make API call to update user flag
            const response = await api.auth.updateFirstLogin({
              id: user._id,
            });
            setFirstTime(false)

            login(response.result, response.token); // Save user & token
            
            console.log("User onboarding completed");
          } catch (err) {
            console.error("Failed to update isFirstLogin:", err);
          }
        },
      });

      driverObj.drive();
    }
  }, [user, firstTime, login]);

  useEffect(() => {
    getAllNotes();
  }, []);

  useEffect(() => {
    const s = search.toLowerCase();
    const filtered = !search.trim()
      ? notes
      : notes.filter(
          (n) =>
            n.title.toLowerCase().includes(s) ||
            n.content.toLowerCase().includes(s) ||
            (n.tags && n.tags.join(", ").toLowerCase().includes(s))
        );

    setFilteredNotes(filtered);
    setPage(1); // Reset to first page on search
    setTotal(filtered.length);
  }, [search, notes]);

  const paginatedNotes = filteredNotes.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="h-full flex flex-col bg-[#121212] text-[#ccc]">
      {/* Search and Create */}
      <div className="flex justify-between items-center mb-4 px-4 py-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes by title, content, or tags..."
          className="p-2 w-full sm:max-w-xs md:max-w-md xs:w-1/3 border rounded bg-[#333333] text-[#ccc] placeholder-[#aaa] focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="search-notes"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-[#9d33ff] transition-colors hover:bg-blue-700"
          id="create-note"
          onClick={() => navigate("/note")}
        >
          + Create Note
        </button>
      </div>

      {/* Notes Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-2" id="notes-grid">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedNotes.map((note) => (
            <div
              key={note._id}
              className="relative group bg-[#1f1f1f] shadow-md rounded p-4 cursor-pointer hover:shadow-lg transition"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNote(note); // Set the selected note for viewing
                setShowModal(true); // Show the modal with the note viewer
              }}
            >
              <h3 className="font-semibold text-lg mb-2 text-white">
                {note.title}
              </h3>
              <p className="text-[#ccc] text-sm">
                {/* Stripping HTML tags from the content */}
                {!note.summary
                  ? stripHtmlTags(note.content).length > 100
                    ? stripHtmlTags(note.content).slice(0, 100) + "..."
                    : stripHtmlTags(note.content)
                  : note.summary.slice(0, 150) + "..."}
              </p>
              {note.tags && (
                <div className="mt-2 text-xs text-blue-400">
                  Tags: {note.tags.join(", ")}
                </div>
              )}
              {note.createdAt && (
                <div className="mt-2 flex justify-between text-xs text-blue-400">
                  <p>createdAt</p>
                  <p>{note.updatedAt.slice(0, 10)}</p>
                </div>
              )}

              {/* Hover Action Icons */}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <i
                  className="fas fa-eye text-blue-400 hover:text-blue-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNote(note); // Set the selected note for viewing
                    setShowModal(true); // Show the modal with the note viewer
                  }}
                ></i>
                <i
                  className="fas fa-edit text-green-400 hover:text-green-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/note/${note._id}`);
                  }}
                ></i>
                <i
                  className="fas fa-trash-alt text-red-600 hover:text-red-700 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNoteToDelete(note._id); // Set the note to delete
                    setShowDeleteConfirmation(true); // Show the confirmation modal
                  }}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div
        className="flex justify-end items-center mt-6 mx-5.5 space-x-2 text-sm"
        id="pagination-notes"
      >
        <button
          className="p-2 rounded-full bg-[#2a2a2a] text-[#ccc] hover:bg-[#444] disabled:opacity-40 cursor-pointer"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          id="prev-page"
          disabled={page === 1}
        >
          <ChevronLeft size={20} />
        </button>

        {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => i + 1)
          .filter(
            (p) =>
              p === 1 ||
              p === Math.ceil(total / pageSize) ||
              Math.abs(p - page) <= 1
          )
          .map((p, i, arr) => (
            <Paginated
              key={p}
              p={p}
              arr={arr}
              i={i}
              setPage={setPage}
              page={page}
            />
          ))}

        <button
          className="p-2 rounded-full bg-[#2a2a2a] text-[#ccc] hover:bg-[#444] disabled:opacity-40 cursor-pointer"
          id="next-page"
          onClick={() =>
            setPage((p) => Math.min(p + 1, Math.ceil(total / pageSize)))
          }
          disabled={page === Math.ceil(total / pageSize)}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <ConfirmationDialog
          handleClick={deleteNote}
          handleCloseModal={handleCloseModal}
          title="Are you sure you want to delete this note?"
        />
      )}

      {/* Modal */}
      {showModal && selectedNote && (
        // NoteViewer component to display the note details
        <NoteViewer id={selectedNote._id} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default Dashboard;
