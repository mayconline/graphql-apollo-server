import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import { getErrorMessage } from './graphql/utils/errorHandler';
import { getToken } from './graphql/utils/shareFunc';

import finance from './services/finance';

import AuthController from './controllers/AuthController';
import RecoveryPasswordController from './controllers/RecoveryPasswordController';
import UserController from './controllers/UserController';
import WalletController from './controllers/WalletController';
import TicketController from './controllers/TicketController';
import FinanceController from './controllers/FinanceController';
import QuestionController from './controllers/QuestionController';
import ReportsController from './controllers/ReportsController';
import EarningController from './controllers/EarningController';

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL).then(
  () => {
    console.log('Successfully connected to db');
  },
  err => {
    console.log('it was not possible to connect to the bd' + err);
  },
);

const dataSources = () => ({
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

server.listen({ port: process.env.PORT });
