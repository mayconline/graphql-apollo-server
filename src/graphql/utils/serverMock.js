const { ApolloServer, gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');

const {
  getCurrentFinanceByTickets,
  getFinance,
} = require('../../services/finance');

const typeDefs = require('../typeDefs');
const resolvers = require('../resolvers');

const dataSources = () => ({
  getCurrentFinanceByTickets,
  getFinance,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  mocks: true,
  mockEntireSchema: false,
});

module.exports = {
  server,
  createTestClient,
  gql,
};
