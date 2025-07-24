import { ApolloServer } from '@apollo/server';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { DocumentNode } from 'graphql';
import { dataSources } from '../controllers';
import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/typeDefs';
import SendGrid from '../services/sendgrid';
import dataMock from './dataMock';
import type { SingleGraphQLResponse } from './type';

const mockApolloServer = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
  }),
  apollo: {
    key: undefined,
    graphRef: undefined,
  },
});

const createTestServer = () => {
  const server = mockApolloServer;

  afterAll(async () => {
    await server.stop();
  });

  return server;
};

const server = createTestServer();

const executeOperation = async (
  query: DocumentNode,
  variables?: Record<string, any>
): Promise<SingleGraphQLResponse<any>> =>
  (await server.executeOperation(
    {
      query,
      variables,
    },
    {
      contextValue: {
        dataSources,
      },
    }
  )) as SingleGraphQLResponse<any>;

dataSources.finance.getCurrentFinanceByTickets = jest.fn(
  () => dataMock.getCurrentFinanceByTickets
) as any;
dataSources.finance.getFinance = jest.fn(() => dataMock.getFinance) as any;

SendGrid.send = jest.fn().mockResolvedValue(true);

export { gql } from 'graphql-tag';
export { executeOperation };
