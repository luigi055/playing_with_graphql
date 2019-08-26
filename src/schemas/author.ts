import * as graphql from "graphql";
import Book from "../models/book";
import BookType, { Book as IBook } from "./book";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = graphql;

export interface Author {
  name: string;
  age: number;
  books: IBook[];
}

export interface AuthorModeled extends Author {
  id: string;
}

const AuthorBook = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent: AuthorModeled) {
        return Book.find({ author_id: parent.id });
      }
    }
  })
});

export default AuthorBook;
