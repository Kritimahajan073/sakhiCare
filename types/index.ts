/**
 * Shared types for SakhiCare.
 */

/** One daily PCOD journey record per user per date. */
export interface DailyRecord {
  _id?: string;
  userId: string;
  date: string; // ISO date YYYY-MM-DD
  right: string[];
  wrong: string[];
  createdAt: Date;
  updatedAt: Date;
}

/** Input for creating or updating a daily record. */
export interface DailyRecordInput {
  right: string[];
  wrong: string[];
}
