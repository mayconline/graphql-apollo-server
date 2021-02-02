module.exports = {
  Query: {
    users: (_, __, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.UserController.index(hasToken),

    getUserByToken: (_, __, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.UserController.show(hasToken),
  },
  Mutation: {
    createUser: (_, args, { dataSources }) =>
      dataSources.UserController.store(args),

    updateUser: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.UserController.update(args, hasToken),

    deleteUser: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.UserController.destroy(args, hasToken),
  },
};
