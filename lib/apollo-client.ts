"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: InstanceType<typeof ApolloClient> | null = null;

function getGraphQLUri(): string {
  const envUri = process.env.NEXT_PUBLIC_GRAPHQL_URI;
  if (envUri) return envUri;
  if (typeof window !== "undefined") {
    return "http://localhost:4000/graphql";
  }
  return "http://localhost:4000/graphql";
}

export function getApolloClient() {
  if (client) return client;

  client = new ApolloClient({
    link: new HttpLink({
      uri: getGraphQLUri(),
      credentials: "include",
      fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
  });

  return client;
}
