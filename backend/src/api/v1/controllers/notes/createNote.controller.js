import { StatusCodes } from "http-status-codes";
import NotesModel from "../../../../models/notes.model.js";
import MESSAGE from "../../../../constants/message.js";
import service from "../../../../services/index.js";
import { stripHtmlTags } from "../../../../services/stripeHtmlTags.js";

const createNote = async (req, res) => {
  try {
    console.log("finding summary");
    const content = stripHtmlTags(req.body.content);
    let error;

    try {
      const summary = await service.openAi.generateSummary(content);
      if (summary) {
        req.body.summary = summary;
      }
      // console.log("summary", summary);
    } catch (err) {
      error = err;
      // console.log(error)
      try {
        const summary = await service.openAi.generateSummaryV1(content);
        if (summary) {
          req.body.summary = summary;
        }
      } catch (erro) {}
    }

    const note = new NotesModel({ ...req.body, userId: req.user._id });
    await note.save();

    res
      .status(StatusCodes.OK)
      .json({
        message: MESSAGE.post.succ,
        result: note,
        error: error?.response?.statusText,
      });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGE.post.fail, error: err });
  }
};

export default createNote;
