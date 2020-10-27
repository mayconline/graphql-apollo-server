module.exports = {
  Query: {
    rebalances: async (_, args, { dataSources, hasToken }) => {
      if (!hasToken) return new Error('Token Not Exists');

      const ticketArray = dataSources.TicketController.show({
        walletID: args.walletID,
      });

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
