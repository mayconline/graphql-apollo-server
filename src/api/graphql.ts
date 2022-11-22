import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import { send } from 'micro';
import Cors from 'micro-cors';

import { setApolloServer } from '../services/apollo';

const { MONGO_URL } = process.env;

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('Successfully connected to db');

      const cors = Cors();
      const { server } = setApolloServer({ isServeless: true });

      server.start().then(() => {
        const handler = server.createHandler({ path: '/api' });

        return cors((req, res) => {
          return req.method === 'OPTIONS'
            ? send(res, 200, 'ok')
            : handler(req, res);
        });
      });
    })
    .catch(err => console.log('error on connect db' + err));
}
