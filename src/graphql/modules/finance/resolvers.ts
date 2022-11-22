export default {
  Query: {
    getApiFinance: async (_, args, { dataSources }) => {
      const finance = await dataSources.finance.getFinance(args.symbol);
      return finance;
    },
  },
};
