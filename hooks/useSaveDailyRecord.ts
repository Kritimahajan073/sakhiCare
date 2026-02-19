"use client";

import { useMutation } from "@apollo/client/react";
import { SAVE_DAILY_RECORD, GET_DAILY_RECORD } from "@/lib/graphql/queries";

interface SaveDailyRecordData {
  saveDailyRecord: {
    id: string;
    date: string;
    right: string[];
    wrong: string[];
    createdAt: string;
    updatedAt: string;
  };
}

export function useSaveDailyRecord() {
  const [mutate, { loading, error }] = useMutation<SaveDailyRecordData>(SAVE_DAILY_RECORD);

  const saveDailyRecord = async (
    date: string,
    input: { right: string[]; wrong: string[] }
  ) => {
    try {
      const result = await mutate({
        variables: { date, input },
        refetchQueries: [
          {
            query: GET_DAILY_RECORD,
            variables: { date },
          },
        ],
      });
      
      if (!result.data || !('saveDailyRecord' in result.data)) {
        const errMsg = (result as any).errors?.[0]?.message || "Failed to save record";
        return { success: false, error: errMsg };
      }
      
      return { success: true, data: result.data.saveDailyRecord };
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
