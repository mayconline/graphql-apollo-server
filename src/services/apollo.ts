import { ApolloServer, type BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { dataSources } from '../controllers';
import customResolvers from '../graphql/resolvers';
import typeDefs from '../graphql/typeDefs';
import { getErrorMessage } from '../utils/errorHandler';
import { getToken } from '../utils/shareFunc';
import { env } from './env';

export function setApolloServer() {
  const server = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers: customResolvers as any,
    formatError: (err) => getErrorMessage(err),
    cache: 'bounded',
  });

  return { server };
}

export async function initApolloServer() {
  const { server } = setApolloServer();

  await startStandaloneServer(server, {
    context: async ({ req }) => ({
      hasToken: getToken(req as any),
      dataSources,
    }),
    listen: { port: Number(env.PORT) },
  });
}
