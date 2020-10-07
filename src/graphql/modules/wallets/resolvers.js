const {
  getSumAmountWallet,
  getSumCostWallet,
  getSumGradeWallet,
  getPercentVariation,
} = require('../../utils/shareFunc');

module.exports = {
  Wallet: {
    user: (wallets, __, { dataSources }) =>
      dataSources.UserController.index().find(
        user => user._id === wallets.user,
      ),

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
  },
  Query: {
    wallets: (_, __, { dataSources }) => dataSources.WalletController.index(),

    getWalletById: (_, args, { dataSources }) =>
      dataSources.WalletController.showOne(args),

    getWalletByUser: (_, args, { dataSources }) =>
      dataSources.WalletController.show(args),
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
