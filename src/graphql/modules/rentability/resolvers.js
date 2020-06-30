const { wallets } = require('../../utils/mocks/dataMock');
const { getTicketsArray } = require('../../utils/shareFunc');

module.exports = {
  Query: {
    getRentability: async (_, args, { dataSources }) => {
      const wallet = wallets.find(wallet => wallet._id === args.walletID);
      const ticketArray = getTicketsArray(wallet);
      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      let sumCostWallet = ticketArray.reduce(
        (acc, cur) => acc + cur.quantity * cur.averagePrice,
        0,
      );
      let sumAmountWallet = currentArray.reduce(
        (acc, cur) => acc + cur.quantity * cur.regularMarketPrice,
        0,
      );

      const rentability = currentArray.map(
        ({
          _id,
          symbol,
          longName,
          quantity,
          averagePrice,
          regularMarketPrice,
          financialCurrency,
        }) => {
          let costAmount = quantity * averagePrice;
          let currentAmount = quantity * regularMarketPrice;
          let variationAmount = currentAmount - costAmount;
          let variationPercent = variationAmount / costAmount;

          return {
            _id,
            symbol,
            longName,
            sumCostWallet,
            sumAmountWallet,
            costAmount,
            currentAmount,
            variationAmount,
            variationPercent,
            financialCurrency,
          };
        },
      );

      return rentability;
    },
  },
};
