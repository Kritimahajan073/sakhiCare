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
