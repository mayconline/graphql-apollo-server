module.exports = {
  Mutation: {
    updateRole: async (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : await dataSources.AuthController.update(args, hasToken),
    login: async (_, args, { dataSources }) =>
      await dataSources.AuthController.show(args),

    reactivateUser: async (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : await await dataSources.AuthController.reactivateUser(args, hasToken),
  },
};
