const { ApolloServer, gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');

const { getCurrentFinanceByTickets, getFinance } = require('./dataMock');

let finance = require('../../../services/finance');

const typeDefs = require('../../typeDefs');
const resolvers = require('../../resolvers');

const dataSources = () => ({
  finance,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  mocks: true,
  mockEntireSchema: false,
});

finance.getCurrentFinanceByTickets = jest.fn(() => getCurrentFinanceByTickets);
finance.getFinance = jest.fn(() => getFinance);

module.exports = {
  server,
  createTestClient,
  gql,
};
