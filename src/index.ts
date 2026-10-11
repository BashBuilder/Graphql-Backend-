import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema.js";
import * as db from "./data.js";

const resolvers = {
  Query: {
    games: () => db.games,
    game: (_parent: any, args: { id: string }) => {
      return db.games.find((game) => game.id === args.id);
    },
    reviews: () => db.reviews,
    review: (_parent: any, args: { id: string }) => {
      return db.reviews.find((review) => review.id === args.id);
    },
    authors: () => db.authors,
    author: (_parent: any, args: { id: string }) => {
      return db.authors.find((author) => author.id === args.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server running on", url, 4000);
