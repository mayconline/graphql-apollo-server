import type { GraphQLFormattedError } from 'graphql';

export type SingleGraphQLResponse<ResponseData> = {
  body: {
    kind: 'single';
    singleResult: {
      data: ResponseData;
      errors?: GraphQLFormattedError[];
    };
  };
};
