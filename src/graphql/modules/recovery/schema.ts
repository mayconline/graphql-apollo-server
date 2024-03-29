import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type RecoveryList {
    _id: ID!
    email: String!
    code: String!
  }

  input EmailInput {
    email: String!
  }

  input ResetInput {
    email: String!
    password: String!
    code: String!
  }

  type Query {
    recoveryList: [RecoveryList]
  }

  type Mutation {
    sendRecovery(input: EmailInput!): Boolean!
    resetPassword(input: ResetInput!): Boolean!
  }
`;
