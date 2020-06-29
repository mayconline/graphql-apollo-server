module.exports = {
  Query: {
    getApiFinance: async (_, args, { dataSources }) => {
      const finance = await dataSources.getFinance(args.symbol);
      return finance;
    },
  },
};
