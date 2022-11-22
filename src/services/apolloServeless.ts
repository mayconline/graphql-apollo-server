import { ApolloServer } from 'apollo-server-express';

import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

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

  const startApolloServer = async (app, httpServer) => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      dataSources,
      context: ({ req }) => ({
        hasToken: getToken(req),
      }),
      formatError: err => getErrorMessage(err),
      cache: 'bounded',
    });

    await server.start();

    server.applyMiddleware({ app });
  };

  return { startApolloServer };
}
