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

  type Query {
    dailyRecord(date: String!): DailyRecord
    dailyRecords(fromDate: String, toDate: String): [DailyRecord!]!
  }

  type Mutation {
    saveDailyRecord(date: String!, input: DailyRecordInput!): DailyRecord!
  }
`;
