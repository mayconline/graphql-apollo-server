const {
  getSumAmountWallet,
  getSumCostWallet,
  getSumGradeWallet,
} = require('../../utils/shareFunc');

module.exports = {
  Wallet: {
    user: (wallets, __, { dataSources }) =>
      dataSources.UserController.index().find(
        user => user._id === wallets.user,
      ),

    ticket: (wallets, __, { dataSources }) =>
      dataSources.TicketController.show(wallets),

    sumGradeWallet: (wallets, __, { dataSources }) => {
      const ticketArray = dataSources.TicketController.show(wallets);
      return getSumGradeWallet(ticketArray);
    },

    sumCostWallet: (wallets, __, { dataSources }) => {
      const ticketArray = dataSources.TicketController.show(wallets);
      return getSumCostWallet(ticketArray);
    },

    sumAmountWallet: async (wallets, __, { dataSources }) => {
      const ticketArray = dataSources.TicketController.show(wallets);

      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      return getSumAmountWallet(currentArray);
    },
  },
  Query: {
    wallets: (_, __, { dataSources }) => dataSources.WalletController.index(),

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
