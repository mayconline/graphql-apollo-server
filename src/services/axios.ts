import axios from 'axios';
import { env } from './env';

const api = axios.create({
  baseURL: env.API_STOCK,
});

const apiSummary = axios.create({
  baseURL: env.API_SUMMARY,
});

export { api, apiSummary };
