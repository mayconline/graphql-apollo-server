const axios = require('axios');

const apiDollar = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br/json/all/',
});

module.exports = apiDollar;
