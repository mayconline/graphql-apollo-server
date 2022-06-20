const { ApolloServer, gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { getErrorMessage } = require('../errorHandler');

const { getCurrentFinanceByTickets, getFinance } = require('./dataMock');

let finance = require('../../../services/finance');
let shareFunc = require('../shareFunc');

const AuthController = require('../../../controllers/AuthController');
const UserController = require('../../../controllers/UserController');
const WalletController = require('../../../controllers/WalletController');
const TicketController = require('../../../controllers/TicketController');
const FinanceController = require('../../../controllers/FinanceController');
const QuestionController = require('../../../controllers/QuestionController');
const ReportsController = require('../../../controllers/ReportsController');

const typeDefs = require('../../typeDefs');
const resolvers = require('../../resolvers');

const dataSources = () => ({
  finance,
  AuthController,
  UserController,
  WalletController,
  TicketController,
  FinanceController,
  QuestionController,
  ReportsController,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => ({
    hasToken: shareFunc.getToken(req),
  }),
  formatError: err => getErrorMessage(err),
  mocks: true,
  mockEntireSchema: true,
  cache: 'bounded',
});

shareFunc.getToken = jest.fn(() => ({
  _id: '1',
  role: 'ADM',
  iat: 1603751302,
  exp: 1603837702,
}));
finance.getCurrentFinanceByTickets = jest.fn(() => getCurrentFinanceByTickets);
finance.getFinance = jest.fn(() => getFinance);

module.exports = {
  server,
  createTestClient,
  gql,
};
