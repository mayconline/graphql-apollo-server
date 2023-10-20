export default {
  Mutation: {
    updateRefreshToken: async (_, args, { dataSources }) => {
      try {
        return await dataSources.RefreshTokenController.update(args);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
