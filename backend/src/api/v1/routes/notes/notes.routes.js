
import express from 'express';
import { createNoteController, deleteNoteController, getAllNotesController, getFilteredNotesController, getNoteByIdController, updateNoteController } from '../../controllers/index.js';

const router = express.Router();



router.post('/create-note',createNoteController);

router.get('/get-all-notes', getAllNotesController);

router.get('/get/:id', getNoteByIdController);

router.put('/update/:id', updateNoteController);

router.delete('/delete/:id',deleteNoteController);

router.get('/filter', getFilteredNotesController); // for testing purpose only

export default router;
