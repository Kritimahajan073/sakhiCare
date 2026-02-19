"use client";

import { useQuery } from "@apollo/client/react";
import { GET_ROUTINE_CHECK } from "@/lib/graphql/queries";

interface RoutineCheckData {
  routineCheck: {
    date: string;
    tasks: {
      wakeUpOnTime: boolean;
      meditation: boolean;
      deepBreathing: boolean;
      morningWalkSunlight: boolean;
      breakfastWithProtein: boolean;
      lunchSimpleNotOutside: boolean;
      dinnerLight: boolean;
      dailyWalk: boolean;
    };
    weightKg?: number | null;
  } | null;
}

export function useRoutineCheck(date: string) {
  const { data, loading, error, refetch } = useQuery<RoutineCheckData>(GET_ROUTINE_CHECK, {
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
