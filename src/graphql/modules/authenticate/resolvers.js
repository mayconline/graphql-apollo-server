module.exports = {
  Query: {
    login: async (_, args, { dataSources }) =>
      await dataSources.AuthController.show(args),
  },
  Mutation: {
    updateRole: async (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : await dataSources.AuthController.update(args, hasToken),
  },
};
