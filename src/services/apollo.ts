import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { getErrorMessage } from '../utils/errorHandler';
import { getToken } from '../utils/shareFunc';

import { dataSources } from '../controllers';
import typeDefs from '../graphql/typeDefs';
import resolvers from '../graphql/resolvers';

export async function setApolloServer() {
  const server = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    formatError: err => getErrorMessage(err),
    cache: 'bounded',
  });

  return { server };
}

export async function initApolloServer() {
  const { server } = await setApolloServer();

  await startStandaloneServer(server, {
    context: async ({ req }) => ({
      hasToken: getToken(req),
      dataSources,
    }),
    listen: { port: Number(process.env.PORT) },
  });
}
