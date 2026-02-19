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

/** Fixed routine tasks for PCOD/PCOS (yes/no per day). */
export interface RoutineTasks {
  wakeUpOnTime: boolean;
  meditation: boolean;
  deepBreathing: boolean;
  morningWalkSunlight: boolean;
  breakfastWithProtein: boolean;
  lunchSimpleNotOutside: boolean;
  dinnerLight: boolean;
  dailyWalk: boolean;
}

/** One routine check per user per date. */
export interface RoutineCheck {
  _id?: string;
  userId: string;
  date: string;
  tasks: RoutineTasks;
  weightKg?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type RoutineTaskId = keyof RoutineTasks;
