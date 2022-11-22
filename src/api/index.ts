import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import { setApolloServer } from '../services/apolloServeless';

const { MONGO_URL } = process.env;

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('Successfully connected to db');
    })
    .catch(err => console.log('error on connect db' + err));
}

const { server } = setApolloServer();

export default server.createHandler();
