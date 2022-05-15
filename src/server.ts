import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { AppDataSource } from "./config/dataSource";
import { MovieResolver } from "./resolvers/MovieResolver";
import app from "./app";

const PORT = process.env.PORT || 4000;

const bootstrap = async (): Promise<void> => {
  await AppDataSource.initialize();
  // await AppDataSource.runMigrations();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      // resolvers: [r__dirname + "/esolvers/**/*.{ts,js}"],
      resolvers: [MovieResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
  });
};

bootstrap();
