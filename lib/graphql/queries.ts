import { gql } from "@apollo/client";

export const GET_DAILY_RECORD = gql`
  query GetDailyRecord($date: String!) {
    dailyRecord(date: $date) {
      id
      date
      right
      wrong
      createdAt
      updatedAt
    }
  }
`;

export const GET_DAILY_RECORDS = gql`
  query GetDailyRecords($fromDate: String, $toDate: String) {
    dailyRecords(fromDate: $fromDate, toDate: $toDate) {
      id
      date
      right
      wrong
      createdAt
      updatedAt
    }
  }
`;

export const SAVE_DAILY_RECORD = gql`
  mutation SaveDailyRecord($date: String!, $input: DailyRecordInput!) {
    saveDailyRecord(date: $date, input: $input) {
      id
      date
      right
      wrong
      createdAt
      updatedAt
    }
  }
`;

export const GET_ROUTINE_CHECK = gql`
  query GetRoutineCheck($date: String!) {
    routineCheck(date: $date) {
      id
      date
      tasks {
        wakeUpOnTime
        meditation
        deepBreathing
        morningWalkSunlight
        breakfastWithProtein
        lunchSimpleNotOutside
        dinnerLight
        dailyWalk
      }
      weightKg
      createdAt
      updatedAt
    }
  }
`;

export const SAVE_ROUTINE_CHECK = gql`
  mutation SaveRoutineCheck($date: String!, $tasks: RoutineTasksInput!, $weightKg: Float) {
    saveRoutineCheck(date: $date, tasks: $tasks, weightKg: $weightKg) {
      id
      date
      tasks {
        wakeUpOnTime
        meditation
        deepBreathing
        morningWalkSunlight
        breakfastWithProtein
        lunchSimpleNotOutside
        dinnerLight
        dailyWalk
      }
      weightKg
      createdAt
      updatedAt
    }
  }
`;
