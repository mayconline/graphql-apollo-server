const axios = require('axios');

const apiDollar2 = axios.create({
  baseURL: process.env.API_DOLLAR2,
});

module.exports = apiDollar2;
