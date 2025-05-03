import NotesModel from "../../../../models/notes.model.js";
// import { StatusCodes } from "http-status-codes";

const getAllNotes = async (req, res) => {
    const notes = await NotesModel.find({ userId: req.user._id, });
    res.json(notes);
  }

  export default getAllNotes;