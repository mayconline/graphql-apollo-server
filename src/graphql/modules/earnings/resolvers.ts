export default {
  Query: {
    getEarningAccByYear: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) {
          throw new Error('Token Not Exists');
        }

        return await dataSources.EarningController.index(
          args,
          hasToken?.decoded
        );
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getEarningByWallet: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) {
          throw new Error('Token Not Exists');
        }

        return await dataSources.EarningController.show(
          args,
          hasToken?.decoded
        );
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getSumEarning: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) {
          throw new Error('Token Not Exists');
        }

        return await dataSources.EarningController.count(
          args,
          hasToken?.decoded
        );
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    updateEarning: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) {
          throw new Error('Token Not Exists');
        }

        return await dataSources.EarningController.update(
          args,
          hasToken?.decoded
        );
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
