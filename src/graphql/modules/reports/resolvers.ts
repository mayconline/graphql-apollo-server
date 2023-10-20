export default {
  Query: {
    getReportsByType: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        const ticketArray = await dataSources.TicketController.show(
          {
            walletID: args.walletID,
          },
          hasToken,
        );

        const currentArray =
          await dataSources.finance.getCurrentFinanceByTickets(ticketArray);

        switch (args.type) {
          case 'TICKET':
            return await dataSources.ReportsController.getEachTicketChart(
              currentArray,
            );
          case 'CLASS':
            return await dataSources.ReportsController.getEachClassChart(
              currentArray,
            );
          case 'SECTOR':
            return await dataSources.ReportsController.getEachSectorChart(
              currentArray,
            );
          case 'INDUSTRY':
            return await dataSources.ReportsController.getEachIndustryChart(
              currentArray,
            );
          default:
            return [];
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
