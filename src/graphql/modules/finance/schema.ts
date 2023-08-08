import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Finance {
    regularMarketPrice: Float
    financialCurrency: String
    longName: String
    symbol: String
  }

  type Query {
    getApiFinance(symbol: String): Finance
  }
`;
