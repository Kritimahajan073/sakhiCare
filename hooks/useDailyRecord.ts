"use client";

import { useQuery } from "@apollo/client/react";
import { GET_DAILY_RECORD } from "@/lib/graphql/queries";

export function useDailyRecord(date: string) {
  const { data, loading, error, refetch } = useQuery(GET_DAILY_RECORD, {
    variables: { date },
    fetchPolicy: "cache-and-network",
  });

  return {
    record: data?.dailyRecord || null,
    loading,
    error,
    refetch,
  };
}
