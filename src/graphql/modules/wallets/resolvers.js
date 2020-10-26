const {
  getSumAmountWallet,
  getSumCostWallet,
  getSumGradeWallet,
  getPercentVariation,
} = require('../../utils/shareFunc');

module.exports = {
  Wallet: {
    user: (_, __, { dataSources, hasToken }) =>
      dataSources.UserController.show(hasToken),

    ticket: (wallets, __, { dataSources }) =>
      dataSources.TicketController.show({ walletID: wallets._id }),

    sumGradeWallet: (wallets, __, { dataSources }) => {
      const ticketArray = dataSources.TicketController.show({
        walletID: wallets._id,
      });
      return getSumGradeWallet(ticketArray);
    },

    sumCostWallet: (wallets, __, { dataSources }) => {
      const ticketArray = dataSources.TicketController.show({
        walletID: wallets._id,
      });
      return getSumCostWallet(ticketArray);
    },

    sumAmountWallet: async (wallets, __, { dataSources }) => {
      const ticketArray = dataSources.TicketController.show({
        walletID: wallets._id,
      });

      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      return getSumAmountWallet(currentArray);
    },
    percentRentabilityWallet: async (wallets, __, { dataSources }) => {
      const ticketArray = dataSources.TicketController.show({
        walletID: wallets._id,
      });

      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      let SumAmount = getSumAmountWallet(currentArray);
      let SumCost = getSumCostWallet(ticketArray);

      return getPercentVariation(SumCost, SumAmount);
    },
    percentPositionWallet: async (wallets, __, { dataSources }) => {
      const ticketArray = dataSources.TicketController.show({
        walletID: wallets._id,
      });

      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      let SumAmount = getSumAmountWallet(currentArray);
      let sumAmountAllWallet = wallets.sumAmountAllWallet;

      let percent = (SumAmount * 100) / sumAmountAllWallet || 0;

      return percent;
    },
  },
  Query: {
    wallets: (_, __, { dataSources }) => dataSources.WalletController.index(),

    getWalletById: (_, args, { dataSources }) =>
      dataSources.WalletController.showOne(args),

    getWalletByUser: async (_, args, { dataSources }) => {
      let AllWallets = dataSources.WalletController.show(args);

      let AllTickets = AllWallets.map(wallets =>
        dataSources.TicketController.show({
          walletID: wallets._id,
        }),
      );

      let ticketArray = AllTickets.reduce((acc, cur) => [...acc, ...cur], []);

      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      let SumAllAmount = getSumAmountWallet(currentArray);

      return AllWallets.map(wallet => ({
        ...wallet,
        sumAmountAllWallet: SumAllAmount,
      }));
    },
  },
  Mutation: {
    createWallet: (_, args, { dataSources }) =>
      dataSources.WalletController.store(args),

    updateWallet: (_, args, { dataSources }) =>
      dataSources.WalletController.update(args),

    deleteWallet: (_, args, { dataSources }) =>
      dataSources.WalletController.destroy(args),
  },
};
