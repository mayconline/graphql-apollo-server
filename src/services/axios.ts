import axios from 'axios';
import { env } from './env';

const api = axios.create({
  baseURL: env.API_STOCK,
});

const apiSummary = axios.create({
  baseURL: env.API_SUMMARY,
});

// Adicionando o header 'User-Agent' nas requisições
api.interceptors.request.use(config => {
  config.headers['User-Agent'] =
    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; .NET CLR 1.0.3705;)'; // Adicionando o header
  return config;
});

export { api, apiSummary };
