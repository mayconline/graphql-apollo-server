import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Finance {
    regularMarketPrice: Float
    financialCurrency: String
    longName: String
    sector: String
    industry: String
  }

  type Query {
    getApiFinance(symbol: String): Finance
  }
`;
