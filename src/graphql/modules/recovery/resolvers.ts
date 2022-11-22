export default {
  Query: {
    recoveryList: (_, __, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.RecoveryPasswordController.index(hasToken),
  },
  Mutation: {
    sendRecovery: async (_, args, { dataSources }) =>
      await dataSources.RecoveryPasswordController.show(args),
    resetPassword: async (_, args, { dataSources }) =>
      await dataSources.RecoveryPasswordController.update(args),
  },
};
