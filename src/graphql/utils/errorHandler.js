const {
  AuthenticationError,
  UserInputError,
  ForbiddenError,
  ApolloError,
} = require('apollo-server');

module.exports = {
  getErrorMessage: ({ message, path }) => {
    switch (message) {
      case 'User or Password Invalid':
        return new AuthenticationError(message);
      case 'Token Not Exists':
        return new AuthenticationError(message);
      case 'Token Invalid or Expired':
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
      case 'Tickets limited to 16 items':
        return new ForbiddenError(message);
      case 'Wallet limited to 2 items':
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
  },
};
