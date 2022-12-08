import { gql } from 'apollo-server';

export const typeDefs = gql`
  type AuthToken {
    token: String
    refreshToken: String
  }

  input updateTokenInput {
    refreshToken: String!
  }

  type Mutation {
    updateRefreshToken(input: updateTokenInput!): AuthToken
  }
`;
