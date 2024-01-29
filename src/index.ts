import mongoose from 'mongoose';
import { initApolloServer } from './services/apollo';
import { env } from './services/env';

const { MONGO_URL } = env;

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('Successfully connected to db');

      initApolloServer();
    })
    .catch(err => console.log(`error on connect db${err}`));
}
