import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Question {
    _id: ID!
    ask: String!
    answer: String!
  }

  input QuestionInput {
    ask: String!
    answer: String!
  }

  type Query {
    questions: [Question!]
  }

  type Mutation {
    createQuestion(input: QuestionInput!): Question!
  }
`;
