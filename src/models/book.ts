import mongoose from "mongoose";
import { Book } from "../schemas/book";

const Schema = mongoose.Schema;

interface IBookModel extends Book, mongoose.Document {}

const bookSchema = new Schema({
  name: String,
  genre: String,
  author_id: mongoose.SchemaTypes.ObjectId
});

export default mongoose.model<IBookModel>("Book", bookSchema);
