module.exports = {
  Query: {
    users: (_, __, { dataSources, isValidToken }) =>
      !isValidToken ? null : dataSources.UserController.index(),

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
