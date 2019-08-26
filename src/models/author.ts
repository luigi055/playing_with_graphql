import mongoose from "mongoose";
import { Author } from "../schemas/author";

const Schema = mongoose.Schema;

interface IAuthorModel extends Author, mongoose.Document {}

const authorSchema = new Schema({
  name: String,
  age: Number
});

export default mongoose.model<IAuthorModel>("Author", authorSchema);
