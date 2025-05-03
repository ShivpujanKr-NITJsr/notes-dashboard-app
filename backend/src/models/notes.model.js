import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
  summary: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const NotesModel = mongoose.model('Notes', NoteSchema);

export default NotesModel;