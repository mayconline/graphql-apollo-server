const { wallets } = require('../../utils/mocks/dataMock');
const { getTicketsArray } = require('../../utils/shareFunc');

const getStatus = percent => {
  if (percent === 0) return 'KEEP';
  return percent > 0 ? 'BUY' : 'ANALYZE';
};

module.exports = {
  Query: {
    rebalances: async (_, args, { dataSources }) => {
      const wallet = wallets.find(wallet => wallet._id === args.walletID);
      const ticketArray = getTicketsArray(wallet);
      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      let sumGradeWallet = ticketArray.reduce((acc, cur) => acc + cur.grade, 0);
      let sumCostWallet = ticketArray.reduce(
        (acc, cur) => acc + cur.quantity * cur.averagePrice,
        0,
      );
      let sumAmountWallet = currentArray.reduce(
        (acc, cur) => acc + cur.quantity * cur.regularMarketPrice,
        0,
      );

      const rebalanced = currentArray.map(
        ({
          _id,
          symbol,
          longName,
          quantity,
          grade,
          regularMarketPrice,
          financialCurrency,
        }) => {
          let currentAmount = quantity * regularMarketPrice;
          let gradePercent = grade / sumGradeWallet;
          let currentPercent = currentAmount / sumAmountWallet;
          let targetPercent = gradePercent - currentPercent;
          let targetAmount = targetPercent * sumAmountWallet;
          let status = getStatus(targetPercent);

          return {
            _id,
            symbol,
            longName,
            status,
            currentAmount,
            gradePercent,
            currentPercent,
            targetPercent,
            targetAmount,
            financialCurrency,
          };
        },
      );

      return rebalanced;
    },
  },
};
