
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';



export const connectDb = async (uri) => {
  await mongoose.connect(uri);
};


