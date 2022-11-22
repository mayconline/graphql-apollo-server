import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Rentability {
    _id: ID!
    symbol: String!
    longName: String!
    sumCostWallet: Float
    sumAmountWallet: Float
    costAmount: Float
    currentAmount: Float
    variationAmount: Float
    variationPercent: Float
    financialCurrency: String!
  }

  enum SortRentability {
    symbol
    costAmount
    currentAmount
    variationPercent
  }

  type Query {
    getRentability(walletID: ID!, sort: SortRentability!): [Rentability]
  }
`;
