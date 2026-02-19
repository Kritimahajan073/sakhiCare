"use client";

import { useMutation } from "@apollo/client/react";
import { SAVE_ROUTINE_CHECK, GET_ROUTINE_CHECK } from "@/lib/graphql/queries";
import type { RoutineTasks } from "@/types";

interface SaveRoutineCheckData {
  saveRoutineCheck: {
    id: string;
    date: string;
    tasks: RoutineTasks;
    weightKg?: number | null;
    createdAt: string;
    updatedAt: string;
  };
}

export function useSaveRoutineCheck() {
  const [mutate, { loading, error }] = useMutation<SaveRoutineCheckData>(SAVE_ROUTINE_CHECK);

  const saveRoutineCheck = async (
    date: string,
    tasks: Partial<RoutineTasks>,
    weightKg?: number | null
  ) => {
    try {
      const result = await mutate({
        variables: { date, tasks, weightKg: weightKg ?? null },
        refetchQueries: [
          { query: GET_ROUTINE_CHECK, variables: { date } },
        ],
      });
      
      if (!result.data || !('saveRoutineCheck' in result.data)) {
        const errMsg = (result as any).errors?.[0]?.message || "Failed to save";
        return { success: false, error: errMsg };
      }
      
      return { success: true, data: result.data.saveRoutineCheck };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to save",
      };
    }
  };

  return { saveRoutineCheck, loading, error };
}
