const { getFinance } = require('../../../services/finance');

module.exports = {
  Query: {
    getApiFinance: async (_, args) => {
      const finance = await getFinance(args.symbol);
      return finance;
    },
  },
};
