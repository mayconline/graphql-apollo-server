export default {
  Mutation: {
    updateRefreshToken: async (_, args, { dataSources }) =>
      await dataSources.RefreshTokenController.update(args),
  },
};
