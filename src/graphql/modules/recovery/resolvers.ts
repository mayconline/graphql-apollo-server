export default {
  Query: {
    recoveryList: async (_, __, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.RecoveryPasswordController.index(hasToken);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    sendRecovery: async (_, args, { dataSources }) => {
      try {
        return await dataSources.RecoveryPasswordController.show(args);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    resetPassword: async (_, args, { dataSources }) => {
      try {
        return await dataSources.RecoveryPasswordController.update(args);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
