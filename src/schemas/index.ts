import * as graphql from "graphql";
import BookType, { Book as IBook } from "./book";
import AuthorType, { Author as IAuthor } from "./author";
import Author from "../models/author";
import Book from "../models/book";

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = graphql;

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
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent: never, args: args) {
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent: never, args: IAuthor) {
        let author = new Author({
          age: args.age,
          name: args.name
        });

        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        author_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent: never, args: IBook) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          author_id: args.author_id
        });

        return book.save();
      }
    }
  }
});

export default new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
});
