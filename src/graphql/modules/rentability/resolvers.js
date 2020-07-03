module.exports = {
  Query: {
    getRentability: async (_, args, { dataSources }) => {
      const wallet = dataSources.WalletController.index().find(
        wallet => wallet._id === args.walletID,
      );

      const ticketArray = dataSources.TicketController.show(wallet);

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
