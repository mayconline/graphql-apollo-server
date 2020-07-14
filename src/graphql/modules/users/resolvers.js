module.exports = {
  Query: {
    users: (_, __, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.UserController.index(),

    getUserByEmail: (_, args, { dataSources }) =>
      dataSources.UserController.show(args),
  },
  Mutation: {
    createUser: (_, args, { dataSources }) =>
      dataSources.UserController.store(args),

    updateUser: (_, args, { dataSources }) =>
      dataSources.UserController.update(args),

    deleteUser: (_, args, { dataSources }) =>
      dataSources.UserController.destroy(args),
  },
};
