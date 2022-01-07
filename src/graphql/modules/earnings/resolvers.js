module.exports = {
  Query: {
    getEarningByWallet: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.EarningController.show(args, hasToken),
    getSumEarning: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.EarningController.count(args, hasToken),
  },

  Mutation: {
    updateEarning: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.EarningController.update(args, hasToken),
  },
};
