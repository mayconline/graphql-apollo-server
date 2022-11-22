import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import { setApolloServer } from './services/apollo';

const { MONGO_URL } = process.env;

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('Successfully connected to db');

      const { server } = setApolloServer({ isServeless: false });

      server.listen({ port: process.env.PORT });
    })
    .catch(err => console.log('error on connect db' + err));
}
