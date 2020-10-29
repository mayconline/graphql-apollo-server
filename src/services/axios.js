const axios = require('axios');

const api = axios.create({
  baseURL: process.env.API_STOCK,
});

module.exports = api;
