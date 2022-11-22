import { gql } from 'apollo-server';

export const typeDefs = gql`
  enum Role {
    USER
    PREMIUM
    ADM
  }

  input AuthInput {
    email: String!
    password: String!
  }

  input AuthPlan {
    transactionDate: Float
    renewDate: Float
    description: String
    localizedPrice: String
    productId: String
    subscriptionPeriodAndroid: String
    packageName: String
    transactionId: String
  }

  input RoleInput {
    role: Role! = USER
    plan: AuthPlan
  }

  input ReactivateUser {
    _id: ID!
    active: Boolean!
  }

  type Mutation {
    login(input: AuthInput!): User
    updateRole(input: RoleInput): User
    reactivateUser(input: ReactivateUser!): Boolean!
  }
`;
