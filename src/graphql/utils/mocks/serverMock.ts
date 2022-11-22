import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { getErrorMessage } from '../errorHandler';

import dataMock from './dataMock';

import finance from '../../../services/finance';
import { getToken } from '../shareFunc';

import AuthController from '../../../controllers/AuthController';
import UserController from '../../../controllers/UserController';
import WalletController from '../../../controllers/WalletController';
import TicketController from '../../../controllers/TicketController';
import FinanceController from '../../../controllers/FinanceController';
import QuestionController from '../../../controllers/QuestionController';
import ReportsController from '../../../controllers/ReportsController';

import typeDefs from '../../typeDefs';
import resolvers from '../../resolvers';

const dataSources: any = () => ({
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
    hasToken: getToken(req),
  }),
  formatError: err => getErrorMessage(err),
  mocks: true,
  mockEntireSchema: true,
  cache: 'bounded',
});

finance.getCurrentFinanceByTickets = jest.fn(
  () => dataMock.getCurrentFinanceByTickets,
) as any;
finance.getFinance = jest.fn(() => dataMock.getFinance) as any;

export { server, createTestClient, gql };
