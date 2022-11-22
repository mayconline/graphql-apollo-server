import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import { setApolloServer } from '../services/apolloServeless';

import http from 'http';
import express from 'express';
import cors from 'cors';

const { MONGO_URL } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('Successfully connected to db');

      const { startApolloServer } = setApolloServer();

      startApolloServer(app, httpServer);
    })
    .catch(err => console.log('error on connect db' + err));
}

export default httpServer;
