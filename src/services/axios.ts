import axios from 'axios';
import { env } from './env';

const api = axios.create({
  baseURL: env.API_STOCK,
});

const apiSummary = axios.create({
  baseURL: env.API_SUMMARY,
});

// Interceptor para adicionar delay de 1 segundo em cada requisição
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

api.interceptors.request.use(async config => {
  await delay(1000); // Delay de 1 segundo
  return config;
});

apiSummary.interceptors.request.use(async config => {
  await delay(1000); // Delay de 1 segundo
  return config;
});

export { api, apiSummary };
