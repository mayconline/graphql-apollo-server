import axios from 'axios';

const apiDollar = axios.create({
  baseURL: process.env.API_DOLLAR,
});

export default apiDollar;
