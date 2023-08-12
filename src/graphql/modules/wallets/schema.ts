import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Wallet {
    _id: ID!
    user: User!
    description: String!
    sumCostWallet: Float!
    sumAmountWallet: Float!
    sumGradeWallet: Float!
    percentRentabilityWallet: Float!
    percentPositionWallet: Float
    sumAmountAllWallet: Float
    ticket: [Ticket]
  }

  input WalletInput {
    description: String!
  }

  type Query {
    wallets: [Wallet]
    getWalletById(_id: ID!): Wallet
    getWalletByUser: [Wallet]
  }

  type Mutation {
    createWallet(input: WalletInput!): Wallet!
    updateWallet(_id: ID!, input: WalletInput!): Wallet
    deleteWallet(_id: ID!): Boolean!
  }
`;
