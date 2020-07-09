const { ApolloServer, gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { getErrorMessage } = require('../errorHandler');

const { getCurrentFinanceByTickets, getFinance } = require('./dataMock');

let finance = require('../../../services/finance');

const AuthController = require('../../../controllers/AuthController');
const UserController = require('../../../controllers/UserController');
const WalletController = require('../../../controllers/WalletController');
const TicketController = require('../../../controllers/TicketController');
const FinanceController = require('../../../controllers/FinanceController');

const typeDefs = require('../../typeDefs');
const resolvers = require('../../resolvers');

const dataSources = () => ({
  finance,
  AuthController,
  UserController,
  WalletController,
  TicketController,
  FinanceController,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  formatError: err => getErrorMessage(err),
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
