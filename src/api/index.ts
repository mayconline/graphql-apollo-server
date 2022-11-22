import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';

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

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const { MONGO_URL } = process.env;

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('Successfully connected to db');

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
          dataSources,
          context: ({ req }) => ({
            hasToken: getToken(req),
          }),
          formatError: err => getErrorMessage(err),
          cache: 'bounded',
          plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        });

        await server.start();

        server.applyMiddleware({ app });
      };

      startApolloServer(app, httpServer);
    })
    .catch(err => console.log('error on connect db' + err));
}

export default httpServer;
