"use client";

import { useQuery } from "@apollo/client/react";
import { GET_DAILY_RECORD } from "@/lib/graphql/queries";

interface DailyRecordData {
  dailyRecord: { date: string; right: string[]; wrong: string[] } | null;
}

export function useDailyRecord(date: string) {
  const { data, loading, error, refetch } = useQuery<DailyRecordData>(GET_DAILY_RECORD, {
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
