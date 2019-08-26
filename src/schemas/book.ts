import * as graphql from "graphql";
import AuthorType, { Author as IAuthor } from "./author";
import Author from "../models/author";

export interface Book {
  name: string;
  genre: string;
  author_id: string;
  author: IAuthor;
}

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const bookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent: Book) {
        return Author.findById(parent.author_id);
      }
    }
  })
});

export default bookType;
