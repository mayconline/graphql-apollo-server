import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum Status {
    BUY
    KEEP
    ANALYZE
  }

  enum SortRebalance {
    symbol
    status
    currentAmount
    targetAmount
    currentPercent
    targetPercent
    gradePercent
  }

  type Rebalance {
    _id: ID!
    symbol: String!
    longName: String!
    status: Status!
    currentAmount: Float!
    gradePercent: Float!
    currentPercent: Float!
    targetPercent: Float!
    targetAmount: Float!
    financialCurrency: String!
  }

  type Query {
    rebalances(walletID: ID!, sort: SortRebalance!): [Rebalance]
  }
`;
