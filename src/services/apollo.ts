import { ApolloServer, type BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { getErrorMessage } from '../utils/errorHandler';
import { getToken } from '../utils/shareFunc';

import { dataSources } from '../controllers';
import typeDefs from '../graphql/typeDefs';
import customResolvers from '../graphql/resolvers';
import { env } from './env';

export async function setApolloServer() {
  const server = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers: customResolvers as any,
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
    listen: { port: Number(env.PORT) },
  });
}
