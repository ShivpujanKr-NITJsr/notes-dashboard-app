//     auth controller
export { default as loginController } from './auth/login.controller.js';
export { default as registerController } from './auth/register.controller.js';
export {default as updateUserIsFirstLogin} from './auth/updateIsFirstLogin.js'


// notes controller

export { default as createNoteController } from './notes/createNote.controller.js';
export { default as getAllNotesController } from './notes/getAllNotes.controller.js';
export { default as getNoteByIdController } from './notes/getNoteById.controller.js';
export { default as updateNoteController } from './notes/updateNote.controller.js';
export { default as deleteNoteController } from './notes/deleteNote.controller.js';
export { default as getFilteredNotesController } from './notes/getFilteredNotes.controller.js';
