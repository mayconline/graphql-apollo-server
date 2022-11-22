import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Finance {
    regularMarketPrice: Float
    financialCurrency: String
    exchange: String
    market: String
    longName: String
    symbol: String
  }

  type Query {
    getApiFinance(symbol: String): Finance
  }
`;
