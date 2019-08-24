import * as graphql from "graphql";
import BookType from "./book";
import AuthorType from "./author";
import dummyBooks from "./mocks/books";
import dummyAuthors from "./mocks/authors";

const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList } = graphql;

type args = {
  id: string;
};

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent: never, args: args) {
        return dummyBooks.find(({ id }) => id === args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent: never, args: args) {
        return dummyAuthors.find(({ id }) => id === args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return dummyBooks;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return dummyAuthors;
      }
    }
  }
});

export default new GraphQLSchema({
  query: rootQuery
});
