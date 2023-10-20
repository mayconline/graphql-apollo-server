import * as dotenv from 'dotenv';

dotenv.config();

import mongoose from 'mongoose';
import { initApolloServer } from './services/apollo';

const { MONGO_URL } = process.env;

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('Successfully connected to db');

      initApolloServer();
    })
    .catch(err => console.log(`error on connect db${err}`));
}
