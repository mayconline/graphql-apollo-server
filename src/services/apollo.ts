import { ApolloServer } from 'apollo-server';
import { ApolloServer as ApolloServeless } from 'apollo-server-micro';

import { getErrorMessage } from '../graphql/utils/errorHandler';
import { getToken } from '../graphql/utils/shareFunc';

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

export function setApolloServer(isServeless = false) {
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

  const selectServer: any = isServeless ? ApolloServeless : ApolloServer;

  const server = new selectServer({
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
