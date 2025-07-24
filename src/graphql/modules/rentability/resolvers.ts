export default {
  Query: {
    getRentability: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) {
          throw new Error('Token Not Exists');
        }

        const ticketArray = await dataSources.TicketController.show(
          {
            walletID: args.walletID,
          },
          hasToken?.decoded
        );

        const currentArray =
          await dataSources.finance.getCurrentFinanceByTickets(ticketArray);

        const rentability = await dataSources.FinanceController.rentability(
          currentArray,
          args.sort
        );

        return rentability;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
