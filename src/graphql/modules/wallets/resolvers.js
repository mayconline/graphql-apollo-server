const {
  getSumAmountWallet,
  getSumCostWallet,
  getSumGradeWallet,
  getPercentVariation,
} = require('../../utils/shareFunc');

module.exports = {
  Wallet: {
    user: (users, __, { dataSources }) =>
      dataSources.UserController.show({ _id: users.user }),

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
    wallets: (_, __, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.WalletController.index(hasToken),

    getWalletById: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.WalletController.showOne(args, hasToken),

    getWalletByUser: async (_, __, { dataSources, hasToken }) => {
      if (!hasToken) return new Error('Token Not Exists');

      let AllWallets = dataSources.WalletController.show(hasToken);

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
    createWallet: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.WalletController.store(args, hasToken),

    updateWallet: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.WalletController.update(args, hasToken),

    deleteWallet: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.WalletController.destroy(args, hasToken),
  },
};
