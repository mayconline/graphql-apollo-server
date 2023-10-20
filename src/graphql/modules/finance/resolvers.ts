export default {
  Query: {
    getApiFinance: async (_, args, { dataSources }) => {
      try {
        return await dataSources.finance.getFinance(args.symbol);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
