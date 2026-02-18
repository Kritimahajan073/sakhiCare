"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: ApolloClient<any> | null = null;

export function getApolloClient() {
  if (client) return client;

  client = new ApolloClient({
    link: new HttpLink({
      uri: "/api/graphql",
      credentials: "include",
    }),
    cache: new InMemoryCache(),
  });

  return client;
}
