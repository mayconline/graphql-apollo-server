import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  MONGO_URL: z.string(),
  PORT: z.string(),
  JWT_TOKEN: z.string(),
  JWT_EXPIRE: z.string(),
  RFT_EXPIRE: z.string(),
  API_STOCK: z.string(),
  API_SUMMARY: z.string(),
  API_DOLLAR: z.string(),
  SENDGRID_API_KEY: z.string(),
  APOLLO_SCHEMA_REPORTING: z.string(),
  APOLLO_GRAPH_REF: z.string(),
  APOLLO_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
