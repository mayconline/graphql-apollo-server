import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_STOCK,
});

const apiSummary = axios.create({
  baseURL: process.env.API_SUMMARY,
});

export { api, apiSummary };
