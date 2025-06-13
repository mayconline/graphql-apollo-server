export default {
  Query: {
    rebalances: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        const ticketArray = await dataSources.TicketController.show(
          {
            walletID: args.walletID,
          },
          hasToken?.decoded,
        );

        const currentArray =
          await dataSources.finance.getCurrentFinanceByTickets(ticketArray);

        const rebalanced = await dataSources.FinanceController.rebalance(
          currentArray,
          args.sort,
        );

        return rebalanced;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
