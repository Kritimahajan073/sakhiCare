import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

const PORT = Number(process.env.PORT) || 4000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== "production",
});

await server.start();

app.use(
  "/graphql",
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  cookieParser(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res }),
  })
);

app.get("/health", (_, res) => {
  res.json({ status: "ok", service: "sakhicare-api" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
