require('dotenv').config();

jest.mock('./src/services/env', () => ({
  env: {
    MONGO_URL: '',
    PORT: '',
    JWT_TOKEN: '',
    JWT_EXPIRE: '',
    RFT_EXPIRE: '',
    API_STOCK: '',
    API_SUMMARY: '',
    API_DOLLAR: '',
    SENDGRID_API_KEY: '',
    APOLLO_SCHEMA_REPORTING: '',
    APOLLO_GRAPH_REF: '',
    APOLLO_KEY: '',
  },
}));
