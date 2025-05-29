import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Plan {
    transactionDate: Float
    renewDate: Float
    description: String
    localizedPrice: String
    productId: String
    subscriptionPeriodAndroid: String
    packageName: String
    transactionId: String
    purchaseToken: String
    platform: Platform
    autoRenewing: Boolean
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    active: Boolean!
    checkTerms: Boolean!
    role: Role!
    token: String
    refreshToken: String
    plan: Plan
  }

  input UserInput {
    email: String!
    password: String!
    active: Boolean! = true
    checkTerms: Boolean!
  }

  input UserUpdateInput {
    email: String
    password: String
    active: Boolean
    checkTerms: Boolean
  }

  type Query {
    users: [User]
    getUserByToken: User
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(input: UserUpdateInput): User
    deleteUser(_id: ID!): Boolean!
  }
`;
