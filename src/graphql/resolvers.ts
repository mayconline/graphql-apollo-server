import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { join } from 'path';
import { env } from '../services/env';

const ext = env.NODE_ENV === 'production' ? 'js' : 'ts';

const resolversArray = loadFilesSync(
  join(__dirname, 'modules', '**', `resolvers.${ext}`),
);

const resolvers = mergeResolvers(resolversArray);

export default resolvers;
