import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import typeDefs from './graphql/typeDefs/index.js';
import resolvers from './graphql/resolvers/index.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
import dotenv from 'dotenv';

dotenv.config();

interface MyContext {
  token?: String;
}

const { json } = bodyParser;
const app = express();
const port = process.env.PORT;

const httpServer = http.createServer(app);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const server = new ApolloServer<MyContext>({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 5000 }, resolve));
console.log(`[Server]: 🚀 Server ready at http://localhost:${port}/graphql`);