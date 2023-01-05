import {
  AuthenticationError,
  UserInputError,
  ForbiddenError,
  ApolloError,
} from 'apollo-server';

export function getErrorMessage({
  message,
  path,
}: {
  message: string;
  path: any;
}) {
  switch (message) {
    case 'User or Password Invalid':
      return new AuthenticationError(message);
    case 'Token Not Exists':
      return new AuthenticationError(message);
    case 'Token Invalid or Expired':
      return new AuthenticationError(message);
    case 'Refresh Token Invalid or Expired':
      return new AuthenticationError(message);
    case 'User Exists':
      return new UserInputError(message, path);
    case 'User Not Exists':
      return new UserInputError(message, path);
    case 'Email Already Send':
      return new UserInputError(message, path);
    case 'Code Invalid or Expired':
      return new UserInputError(message, path);
    case 'User Unauthorized':
      return new ForbiddenError(message);
    case 'User Inactive':
      return new ForbiddenError(message);
    case 'Wallet Not Found':
      return new UserInputError(message, path);
    case 'Ticket Not Found':
      return new UserInputError(message, path);
    case 'Earning Not Found':
      return new UserInputError(message, path);
    case 'Ticket Exists':
      return new UserInputError(message, path);
    case 'Earning Exists':
      return new UserInputError(message, path);
    case 'Tickets limit Reached':
      return new ForbiddenError(message);
    case 'Wallet limit Reached':
      return new ForbiddenError(message);
    case 'Failed Convert Dollar':
      return new ApolloError(message, path);
    case 'Failed Stock API':
      return new ApolloError(message, path);
    case 'Failed SendGrid':
      return new ApolloError(message, path);
    default:
      return new Error(message);
  }
}
