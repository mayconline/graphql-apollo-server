import 'dotenv/config';

import mongoose from 'mongoose';

import { initApolloServer } from './services/apollo';
import { env } from './services/env';

import { startCpuProfiling, stopCpuProfiling } from './services/cpuProfiling';

const { MONGO_URL, NODE_ENV } = env;

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('Successfully connected to db');

      initApolloServer();
    })
    .catch(err => console.log(`error on connect db${err}`));
}

if (NODE_ENV === 'development') {
  startCpuProfiling();
  stopCpuProfiling();
}
