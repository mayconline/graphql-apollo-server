import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

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
import RefreshTokenController from '../controllers/RefreshToken';

import typeDefs from '../graphql/typeDefs';
import resolvers from '../graphql/resolvers';

export async function setApolloServer() {
  const dataSources = {
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
    RefreshTokenController,
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: err => getErrorMessage(err),
    cache: 'bounded',
  });

  await startStandaloneServer(server, {
    context: async ({ req }) => ({
      hasToken: getToken(req),
      dataSources,
    }),
    listen: { port: Number(process.env.PORT) },
  });

  return { server, dataSources, startStandaloneServer };
}
