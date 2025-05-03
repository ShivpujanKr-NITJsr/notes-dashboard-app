import MESSAGE from "../../../../constants/message.js";
import NotesModel from "../../../../models/notes.model.js";
import { StatusCodes } from "http-status-codes";

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await NotesModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedNote) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: MESSAGE.delete.notFound });
    }

    res.status(StatusCodes.OK).json({ message: MESSAGE.delete.succ });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGE.delete.fail, error: err });
  }
};

export default deleteNote;
