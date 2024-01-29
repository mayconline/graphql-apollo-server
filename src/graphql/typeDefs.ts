import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { join } from 'path';
import { env } from '../services/env';

const ext = env.NODE_ENV === 'production' ? 'js' : 'ts';

const typesArray = loadFilesSync(
  join(__dirname, 'modules', '**', `schema.${ext}`),
);

const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;
