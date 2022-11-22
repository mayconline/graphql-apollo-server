import { ApolloServer } from 'apollo-server-lambda';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

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

  const resolver: any = resolvers;

  const server = new ApolloServer({
    typeDefs,
    resolvers: resolver,
    dataSources,
    context: ({ context }) => ({
      hasToken: getToken(context),
    }),
    formatError: err => getErrorMessage(err),
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  return { server };
}
