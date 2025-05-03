
import { createNote } from "./createNote";
import { deleteNote } from "./deleteNote";
import { getAllNotes } from "./getAllNotes";
import { getFilteredNotes } from "./getFilteredNotes";
import { getNoteById } from "./getNoteById";
import { updateNote } from "./updateNote";




export const notes={
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    getFilteredNotes
}