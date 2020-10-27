module.exports = {
  Query: {
    login: (_, args, { dataSources }) => dataSources.AuthController.show(args),
  },
  Mutation: {
    updateRole: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.AuthController.update(args, hasToken),
  },
};
