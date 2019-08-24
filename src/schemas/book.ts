import * as graphql from "graphql";
import AuthorType, { Author } from "./author";
import dummyAuthor from "./mocks/authors";

export interface Book {
  id: string;
  name: string;
  genre: string;
  author_id: string;
  author: Author;
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
        return dummyAuthor.find(({ id }) => id === parent.author_id);
      }
    }
  })
});

export default bookType;
