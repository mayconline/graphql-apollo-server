import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum Platform {
    ANDROID
    IOS
  }

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
    purchaseToken: String
    platform: Platform
    autoRenewing: Boolean
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
