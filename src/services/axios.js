const axios = require('axios');

const api = axios.create({
  baseURL: process.env.API_STOCK,
});

const apiSummary = axios.create({
  baseURL: process.env.API_SUMMARY,
});

module.exports = {
  api,
  apiSummary,
};
