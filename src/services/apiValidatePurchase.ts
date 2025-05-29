import axios from 'axios';
import { env } from './env';

const apiValidatePurchase = axios.create({
  baseURL: env.API_VALIDATE_PURCHASE,
});

export default apiValidatePurchase;
