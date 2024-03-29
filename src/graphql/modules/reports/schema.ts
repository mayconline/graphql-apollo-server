import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum Type {
    TICKET
    CLASS
    SECTOR
    INDUSTRY
  }

  type Report {
    _id: ID!
    key: String!
    value: Float!
    color: String!
  }

  type Query {
    getReportsByType(walletID: ID!, type: Type!): [Report]
  }
`;
