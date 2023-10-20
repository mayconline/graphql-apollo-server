import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { gql } from 'graphql-tag';

import dataMock from './dataMock';
import SendGrid from '../services/sendgrid';

import { dataSources } from '../controllers';
import typeDefs from '../graphql/typeDefs';
import resolvers from '../graphql/resolvers';

const mockApolloServer = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
  }),
});

dataSources.finance.getCurrentFinanceByTickets = jest.fn(
  () => dataMock.getCurrentFinanceByTickets,
) as any;
dataSources.finance.getFinance = jest.fn(() => dataMock.getFinance) as any;

SendGrid.send = jest.fn().mockResolvedValue(true);

export { mockApolloServer, gql, dataSources };
