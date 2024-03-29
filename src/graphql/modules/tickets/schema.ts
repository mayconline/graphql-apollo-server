import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Ticket {
    _id: ID!
    symbol: String!
    name: String
    quantity: Float!
    averagePrice: Float!
    grade: Int!
    classSymbol: String
  }

  enum SortTickets {
    symbol
    grade
  }

  input TicketInput {
    symbol: String!
    name: String!
    quantity: Float!
    averagePrice: Float!
    grade: Int!
  }

  type Query {
    tickets: [Ticket!]
    getTicketsByWallet(walletID: ID!, sort: SortTickets! = grade): [Ticket]
  }

  type Mutation {
    createTicket(walletID: ID!, input: TicketInput!): Ticket!
    updateTicket(_id: ID!, input: TicketInput!): Ticket
    deleteTicket(_id: ID!, walletID: ID!): Boolean!
  }
`;
