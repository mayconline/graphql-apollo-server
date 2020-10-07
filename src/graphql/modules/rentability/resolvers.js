module.exports = {
  Query: {
    getRentability: async (_, args, { dataSources }) => {
      const ticketArray = dataSources.TicketController.show({
        walletID: args.walletID,
      });

      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      const rentability = dataSources.FinanceController.rentability(
        currentArray,
        args.sort,
      );

      return rentability;
    },
  },
};
