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
      case 'User Unauthorized':
        return new ForbiddenError(message);
      case 'User Inactive':
        return new ForbiddenError(message);
      case 'Wallet Not Found':
        return new UserInputError(message, path);
      case 'Ticket Not Found':
        return new UserInputError(message, path);
      case 'Failed Convert Dollar':
        return new ApolloError(message, path);
      case 'Failed Stock API':
        return new ApolloError(message, path);
      default:
        return new Error(message);
    }
  },
};
