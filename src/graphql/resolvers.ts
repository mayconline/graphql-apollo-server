import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { join } from 'path';
import { env } from '../services/env';

const ext = env.NODE_ENV === 'production' ? 'js' : 'ts';

const isVercel = env.IS_VERCEL === 'TRUE';

console.log(`IS_VERCEL: ${isVercel}`);

console.log(`dir: ${process.cwd()}`);
console.log(`ext: ${__dirname}`);

const resolversArrayVercel = loadFilesSync(
  join(process.cwd(), 'modules', '**', `resolvers.ts`),
);

const resolversArray = loadFilesSync(
  join(__dirname, 'modules', '**', `resolvers.${ext}`),
);

const resolvers = mergeResolvers(
  isVercel ? resolversArrayVercel : resolversArray,
);

export default resolvers;
