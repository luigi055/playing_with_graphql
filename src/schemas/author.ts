import * as graphql from "graphql";
import BookType, { Book } from "./book";
import dummyBooks from "./mocks/books";

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
  id: string;
  books: Book[];
}

const authorBook = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return dummyBooks.filter(({ author_id }) => author_id === parent.id);
      }
    }
  })
});

export default authorBook;
