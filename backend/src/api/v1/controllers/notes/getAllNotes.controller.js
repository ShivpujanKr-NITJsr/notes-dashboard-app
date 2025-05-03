import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message.js";
import NotesModel from "../../../../models/notes.model.js";

const getAllNotes = async (req, res) => {
  try {
    const notes = await NotesModel.find({ userId: req.user._id });

    res
      .status(StatusCodes.OK)
      .json({ message: MESSAGE.get.succ, result: notes });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGE.get.fail, error: err });
  }
};

export default getAllNotes;
