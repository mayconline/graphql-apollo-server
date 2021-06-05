module.exports = {
  Query: {
    getReportsByType: async (_, args, { dataSources, hasToken }) => {
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

      if (args.type === 'TICKET') {
        return await dataSources.ReportsController.getEachTicketChart(
          currentArray,
        );
      } else if (args.type === 'CLASS') {
        return await dataSources.ReportsController.getEachClassChart(
          currentArray,
        );
      } else return [];
    },
  },
};
