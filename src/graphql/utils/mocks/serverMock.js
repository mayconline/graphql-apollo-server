import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { getErrorMessage } from '../errorHandler';

import { getCurrentFinanceByTickets, getFinance } from './dataMock';

import finance from '../../../services/finance';
import shareFunc from '../shareFunc';

import AuthController from '../../../controllers/AuthController';
import UserController from '../../../controllers/UserController';
import WalletController from '../../../controllers/WalletController';
import TicketController from '../../../controllers/TicketController';
import FinanceController from '../../../controllers/FinanceController';
import QuestionController from '../../../controllers/QuestionController';
import ReportsController from '../../../controllers/ReportsController';

import typeDefs from '../../typeDefs';
import resolvers from '../../resolvers';

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
