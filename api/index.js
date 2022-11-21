import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import mongoose from 'mongoose';
import http from 'http';
import express from 'express';
import cors from 'cors';

import { getErrorMessage } from '../src/graphql/utils/errorHandler';
import { getToken } from '../src/graphql/utils/shareFunc';

import finance from '../src/services/finance';

import AuthController from '../src/controllers/AuthController';
import RecoveryPasswordController from '../src/controllers/RecoveryPasswordController';
import UserController from '../src/controllers/UserController';
import WalletController from '../src/controllers/WalletController';
import TicketController from '../src/controllers/TicketController';
import FinanceController from '../src/controllers/FinanceController';
import QuestionController from '../src/controllers/QuestionController';
import ReportsController from '../src/controllers/ReportsController';
import EarningController from '../src/controllers/EarningController';

import typeDefs from '../src/graphql/typeDefs';
import resolvers from '../src/graphql/resolvers';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL).then(
  () => {
    console.log('Successfully connected to db');
  },
  err => {
    console.log('it was not possible to connect to the bd' + err);
  },
);

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

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

startApolloServer(app, httpServer);

export default httpServer;
