"use client";

import { ApolloProvider as ApolloProviderBase } from "@apollo/client/react";
import { getApolloClient } from "@/lib/apollo-client";

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProviderBase client={getApolloClient()}>
      {children}
    </ApolloProviderBase>
  );
}
