module.exports = {
  Query: {
    rebalances: async (_, args, { dataSources, hasToken }) => {
      if (!hasToken) return new Error('Token Not Exists');

      const ticketArray = await dataSources.TicketController.show(
        {
          walletID: args.walletID,
        },
        hasToken,
      );

      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      const rebalanced = await dataSources.FinanceController.rebalance(
        currentArray,
        args.sort,
      );

      return rebalanced;
    },
  },
};
