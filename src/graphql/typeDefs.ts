import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { join } from 'path';

const ext = process.env.NODE_ENV === 'production' ? 'js' : 'ts';

const typesArray = loadFilesSync(
  join(__dirname, 'modules', '**', `schema.${ext}`),
);

const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;
