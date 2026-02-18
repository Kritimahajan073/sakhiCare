import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

let apolloServer: ApolloServer | null = null;

export async function getApolloServer(): Promise<ApolloServer> {
  if (apolloServer) return apolloServer;

  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== "production",
  });

  await apolloServer.start();
  return apolloServer;
}
