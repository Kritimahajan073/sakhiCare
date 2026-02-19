import type { RoutineTaskId } from "@/types";

export const ROUTINE_TASK_LABELS: Record<RoutineTaskId, string> = {
  wakeUpOnTime: "Wake up at the same time every day",
  meditation: "Meditation (few minutes)",
  deepBreathing: "Deep breathing exercises",
  morningWalkSunlight: "Morning walk & sunlight",
  breakfastWithProtein: "Breakfast with 1 protein source",
  lunchSimpleNotOutside: "Lunch: simple food, not outside",
  dinnerLight: "Dinner: eat light",
  dailyWalk: "Daily walk",
};

export const ROUTINE_TASK_ORDER: RoutineTaskId[] = [
  "wakeUpOnTime",
  "meditation",
  "deepBreathing",
  "morningWalkSunlight",
  "breakfastWithProtein",
  "lunchSimpleNotOutside",
  "dinnerLight",
  "dailyWalk",
];

export const MINDSET_TIPS = [
  "Small steps build big change. One day at a time.",
  "Consistency beats perfection. Doing a little daily matters more than doing everything once.",
  "Your body is healing. Rest and routine support hormone balance.",
  "Morning sunlight helps regulate cortisol and improve mood.",
  "Protein at breakfast helps stabilise blood sugar and keeps you full.",
  "Portion control and calorie awareness support sustainable weight balance.",
  "Walking boosts dopamine and supports insulin sensitivity.",
];
