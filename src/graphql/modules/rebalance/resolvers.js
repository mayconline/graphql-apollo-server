module.exports = {
  Query: {
    rebalances: async (_, args, { dataSources }) => {
      const wallet = dataSources.WalletController.index().find(
        wallet => wallet._id === args.walletID,
      );

      const ticketArray = dataSources.TicketController.show(wallet);

      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      const rebalanced = dataSources.FinanceController.rebalance(
        currentArray,
        args.sort,
      );

      return rebalanced;
    },
  },
};
