import MESSAGE from "../../../../constants/message.js";
import NotesModel from "../../../../models/notes.model.js";
import { StatusCodes } from "http-status-codes";

const getNoteById = async (req, res) => {
  try {
    const note = await NotesModel.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!note) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: MESSAGE.get.notFound });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: MESSAGE.get.succ, result: note });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGE.get.fail, error: err });
  }
};

export default getNoteById;
