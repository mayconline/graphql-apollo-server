import { GraphQLError } from 'graphql';

enum ERROR_CODE {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  FORBIDDEN = 'FORBIDDEN',
  API_ERROR = 'API_ERROR',
}

export const setGraphQLError = (message, code) => {
  return new GraphQLError(message, {
    extensions: {
      code,
    },
  });
};

export function getErrorMessage(err) {
  switch (err.message) {
    case 'User or Password Invalid':
      return setGraphQLError(err.message, ERROR_CODE.UNAUTHENTICATED);
    case 'Token Not Exists':
      return setGraphQLError(err.message, ERROR_CODE.UNAUTHENTICATED);
    case 'Token Invalid or Expired':
      return setGraphQLError(err.message, ERROR_CODE.UNAUTHENTICATED);
    case 'Refresh Token Invalid or Expired':
      return setGraphQLError(err.message, ERROR_CODE.UNAUTHENTICATED);
    case 'User Exists':
      return setGraphQLError(err.message, ERROR_CODE.BAD_USER_INPUT);
    case 'User Not Exists':
      return setGraphQLError(err.message, ERROR_CODE.BAD_USER_INPUT);
    case 'Email Already Send':
      return setGraphQLError(err.message, ERROR_CODE.BAD_USER_INPUT);
    case 'Code Invalid or Expired':
      return setGraphQLError(err.message, ERROR_CODE.BAD_USER_INPUT);
    case 'User Unauthorized':
      return setGraphQLError(err.message, ERROR_CODE.FORBIDDEN);
    case 'User Inactive':
      return setGraphQLError(err.message, ERROR_CODE.FORBIDDEN);
    case 'Wallet Not Found':
      return setGraphQLError(err.message, ERROR_CODE.BAD_USER_INPUT);
    case 'Ticket Not Found':
      return setGraphQLError(err.message, ERROR_CODE.BAD_USER_INPUT);
    case 'Earning Not Found':
      return setGraphQLError(err.message, ERROR_CODE.BAD_USER_INPUT);
    case 'Ticket Exists':
      return setGraphQLError(err.message, ERROR_CODE.BAD_USER_INPUT);
    case 'Earning Exists':
      return setGraphQLError(err.message, ERROR_CODE.BAD_USER_INPUT);
    case 'Tickets limit Reached':
      return setGraphQLError(err.message, ERROR_CODE.FORBIDDEN);
    case 'Wallet limit Reached':
      return setGraphQLError(err.message, ERROR_CODE.FORBIDDEN);
    case 'Failed Convert Dollar':
      return setGraphQLError(err.message, ERROR_CODE.API_ERROR);
    case 'Failed Stock API':
      return setGraphQLError(err.message, ERROR_CODE.API_ERROR);
    case 'Failed SendGrid':
      return setGraphQLError(err.message, ERROR_CODE.API_ERROR);
    default:
      return setGraphQLError(err.message, err?.extensions?.code);
  }
}
