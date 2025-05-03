
import { auth } from "./api/auth";
import { notes } from "./api/notes";



export const api={
    auth:{
        register:auth.register,
        login:auth.login,
        updateFirstLogin:auth.updateFirstLogin
    },
    notes:{
        createNote:notes.createNote,
        getAllNotes:notes.getAllNotes,
        getNoteById:notes.getNoteById,
        update:notes.updateNote,
        delete:notes.deleteNote,
        getFilteredNotes:notes.getFilteredNotes
    },
}