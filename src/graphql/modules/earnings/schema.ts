import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Earning {
    _id: ID!
    year: Int!
    month: Int!
    amount: Float!
  }

  type SumEarning {
    sumCurrentYear: Float!
    sumOldYear: Float!
    sumTotalEarnings: Float!
    yieldOnCost: Float!
  }

  type EarningAccByYear {
    _id: ID!
    year: Int!
    amount: Float!
  }

  input EarningInput {
    year: Int!
    month: Int!
    amount: Float!
  }

  type Query {
    getEarningAccByYear(walletID: ID!): [EarningAccByYear!]!
    getEarningByWallet(walletID: ID!, year: Int!): [Earning!]!
    getSumEarning(walletID: ID!, year: Int!): SumEarning!
  }

  type Mutation {
    updateEarning(_id: ID, walletID: ID!, input: EarningInput!): Earning
  }
`;
