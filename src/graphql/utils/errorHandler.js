const {
  AuthenticationError,
  UserInputError,
  ForbiddenError,
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
      case 'Wallet Not Found':
        return new UserInputError(message, path);
      case 'Ticket Not Found':
        return new UserInputError(message, path);
      default:
        return new Error(message);
    }
  },
};
