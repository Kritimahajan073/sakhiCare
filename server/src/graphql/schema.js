import { gql } from "graphql-tag";

export const typeDefs = gql`
  type DailyRecord {
    id: ID
    date: String!
    right: [String!]!
    wrong: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  input DailyRecordInput {
    right: [String!]!
    wrong: [String!]!
  }

  type RoutineTasks {
    wakeUpOnTime: Boolean!
    meditation: Boolean!
    deepBreathing: Boolean!
    morningWalkSunlight: Boolean!
    breakfastWithProtein: Boolean!
    lunchSimpleNotOutside: Boolean!
    dinnerLight: Boolean!
    dailyWalk: Boolean!
  }

  type RoutineCheck {
    id: ID
    date: String!
    tasks: RoutineTasks!
    weightKg: Float
    createdAt: String!
    updatedAt: String!
  }

  input RoutineTasksInput {
    wakeUpOnTime: Boolean
    meditation: Boolean
    deepBreathing: Boolean
    morningWalkSunlight: Boolean
    breakfastWithProtein: Boolean
    lunchSimpleNotOutside: Boolean
    dinnerLight: Boolean
    dailyWalk: Boolean
  }

  type Query {
    dailyRecord(date: String!): DailyRecord
    dailyRecords(fromDate: String, toDate: String): [DailyRecord!]!
    routineCheck(date: String!): RoutineCheck
    routineChecks(fromDate: String, toDate: String): [RoutineCheck!]!
  }

  type Mutation {
    saveDailyRecord(date: String!, input: DailyRecordInput!): DailyRecord!
    saveRoutineCheck(date: String!, tasks: RoutineTasksInput!, weightKg: Float): RoutineCheck!
  }
`;
