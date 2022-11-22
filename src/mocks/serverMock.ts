import { ApolloServer, gql } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';

import dataMock from './dataMock';

import { getErrorMessage } from '../utils/errorHandler';
import { getToken } from '../utils/shareFunc';

import finance from '../services/finance';
import SendGrid from '../services/sendgrid';

import AuthController from '../controllers/AuthController';
import RecoveryPasswordController from '../controllers/RecoveryPasswordController';
import UserController from '../controllers/UserController';
import WalletController from '../controllers/WalletController';
import TicketController from '../controllers/TicketController';
import FinanceController from '../controllers/FinanceController';
import QuestionController from '../controllers/QuestionController';
import ReportsController from '../controllers/ReportsController';
import EarningController from '../controllers/EarningController';

import typeDefs from '../graphql/typeDefs';
import resolvers from '../graphql/resolvers';

const dataSources: any = () => ({
  finance,
  AuthController,
  RecoveryPasswordController,
  UserController,
  WalletController,
  TicketController,
  FinanceController,
  QuestionController,
  ReportsController,
  EarningController,
});

const serverMock: any = ApolloServer;

const server = new serverMock({
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

(getToken as any) = jest.fn();

finance.getCurrentFinanceByTickets = jest.fn(
  () => dataMock.getCurrentFinanceByTickets,
) as any;
finance.getFinance = jest.fn(() => dataMock.getFinance) as any;

SendGrid.send = jest.fn().mockResolvedValue(true);

export { server, createTestClient, gql };
