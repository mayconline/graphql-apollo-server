import axios from 'axios';

const apiDollar2 = axios.create({
  baseURL: process.env.API_DOLLAR2,
});

export default apiDollar2;
