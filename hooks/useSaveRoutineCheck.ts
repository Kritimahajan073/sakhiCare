"use client";

import { useMutation } from "@apollo/client/react";
import { SAVE_ROUTINE_CHECK, GET_ROUTINE_CHECK } from "@/lib/graphql/queries";
import type { RoutineTasks } from "@/types";

export function useSaveRoutineCheck() {
  const [mutate, { loading, error }] = useMutation(SAVE_ROUTINE_CHECK, {
    refetchQueries: ({ variables }) => [
      { query: GET_ROUTINE_CHECK, variables: { date: variables?.date } },
    ],
  });

  const saveRoutineCheck = async (
    date: string,
    tasks: Partial<RoutineTasks>,
    weightKg?: number | null
  ) => {
    try {
      const result = await mutate({
        variables: { date, tasks, weightKg: weightKg ?? null },
      });
      const errMsg = result.errors?.[0]?.message;
      if (errMsg) {
        return { success: false, error: errMsg };
      }
      return { success: true, data: result.data?.saveRoutineCheck };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to save",
      };
    }
  };

  return { saveRoutineCheck, loading, error };
}
