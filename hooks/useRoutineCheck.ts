"use client";

import { useQuery } from "@apollo/client/react";
import { GET_ROUTINE_CHECK } from "@/lib/graphql/queries";

export function useRoutineCheck(date: string) {
  const { data, loading, error, refetch } = useQuery(GET_ROUTINE_CHECK, {
    variables: { date },
    fetchPolicy: "cache-and-network",
  });

  return {
    check: data?.routineCheck ?? null,
    loading,
    error,
    refetch,
  };
}
