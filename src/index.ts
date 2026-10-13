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
  Game: {
    reviews: (parent: any) => {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews: (parent: any) => {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    game: (parent: any) => {
      return db.games.find((game) => game.id === parent.game_id);
    },
    author: (parent: any) => {
      return db.authors.find((author) => author.id === parent.author_id);
    },
  },
  Mutation: {
    deleteGame: (_parent: any, args: { id: string }) => {
      const game = db.games.find((game) => game.id === args.id);
      if (!game) {
        throw new Error("Game not found");
      }
      return db.games.filter((game) => game.id !== args.id);
    },
    addGame: (_parent: any, args: { title: string; platfrom: string[] }) => {
      const game = {
        id: db.games.length + 1 + "",
        title: args.title,
        platfrom: args.platfrom,
        reviews: [],
      };
      return game;
      // db.games.push(game);
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
