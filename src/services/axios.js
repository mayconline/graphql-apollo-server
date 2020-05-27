const axios = require('axios');

const api = axios.create({
  baseURL: 'https://query1.finance.yahoo.com/v7/finance/',
});

module.exports = api;
