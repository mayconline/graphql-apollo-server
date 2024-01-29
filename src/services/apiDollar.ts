import axios from 'axios';
import { env } from './env';

const apiDollar = axios.create({
  baseURL: env.API_DOLLAR,
});

export default apiDollar;
