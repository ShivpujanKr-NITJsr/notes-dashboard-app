import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isFirstLogin: { type: Boolean, default: true },
});
const UsersModel= mongoose.model('Users', UserSchema);

export default UsersModel;