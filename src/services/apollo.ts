import { ApolloServer } from 'apollo-server';

import { getErrorMessage } from '../utils/errorHandler';
import { getToken } from '../utils/shareFunc';

import finance from '../services/finance';

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

export function setApolloServer() {
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

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context: ({ req }) => ({
      hasToken: getToken(req),
    }),
    formatError: err => getErrorMessage(err),
    cache: 'bounded',
  });

  return { server };
}
