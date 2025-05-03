import MESSAGE from "../../../../constants/message.js";
import NotesModel from "../../../../models/notes.model.js";
import { StatusCodes } from "http-status-codes";
import service from "../../../../services/index.js";

const updateNote = async (req, res) => {
  try {

    const content = stripHtmlTags(req.body.content);
    let error;

    try {
      const summary = await service.openAi.generateSummary(content);
      if (summary) {
        req.body.summary = summary;
      }
    } catch (err) {
      error = err;
      console.log(error)
    }

    const updated = await NotesModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    res
      .status(StatusCodes.OK)
      .json({ message: MESSAGE.put.succ, result: updated,error:error?.response?.statusText });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGE.put.fail, error: err });
  }
};

export default updateNote;
