const axios = require('axios');

const apiDollar = axios.create({
  baseURL: process.env.API_DOLLAR,
});

module.exports = apiDollar;
