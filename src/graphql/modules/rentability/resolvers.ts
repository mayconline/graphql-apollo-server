export default {
  Query: {
    getRentability: async (_, args, { dataSources, hasToken }) => {
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

      const rentability = await dataSources.FinanceController.rentability(
        currentArray,
        args.sort,
      );

      return rentability;
    },
  },
};
