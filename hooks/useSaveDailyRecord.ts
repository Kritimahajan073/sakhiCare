"use client";

import { useMutation } from "@apollo/client/react";
import { SAVE_DAILY_RECORD, GET_DAILY_RECORD } from "@/lib/graphql/queries";

export function useSaveDailyRecord() {
  const [mutate, { loading, error }] = useMutation(SAVE_DAILY_RECORD, {
    refetchQueries: ({ variables }) => [
      {
        query: GET_DAILY_RECORD,
        variables: { date: variables?.date },
      },
    ],
  });

  const saveDailyRecord = async (
    date: string,
    input: { right: string[]; wrong: string[] }
  ) => {
    try {
      const result = await mutate({
        variables: { date, input },
      });
      return { success: true, data: result.data?.saveDailyRecord };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to save record",
      };
    }
  };

  return {
    saveDailyRecord,
    loading,
    error,
  };
}
