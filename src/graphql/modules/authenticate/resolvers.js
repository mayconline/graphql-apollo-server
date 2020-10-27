module.exports = {
  Query: {
    login: (_, args, { dataSources }) => dataSources.AuthController.show(args),
  },
  Mutation: {
    updateRole: (_, args, { dataSources, hasToken }) =>
      dataSources.AuthController.update(args, hasToken),
  },
};
