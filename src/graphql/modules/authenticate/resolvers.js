module.exports = {
  Query: {
    login: (_, args, { dataSources }) => dataSources.AuthController.show(args),
  },
};
