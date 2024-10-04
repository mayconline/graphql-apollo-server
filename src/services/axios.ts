import axios from 'axios';
import { env } from './env';

console.log(env);

const api = axios.create({
  baseURL: env.API_STOCK,
});

const apiSummary = axios.create({
  baseURL: env.API_SUMMARY,
});

export { api, apiSummary };
