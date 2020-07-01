module.exports = {
  Query: {
    tickets: (_, __, { dataSources }) => dataSources.TicketController.index(),

    getTicketsByWallet: (_, args, { dataSources }) =>
      dataSources.TicketController.show(args),
  },
  Mutation: {
    createTicket: (_, args, { dataSources }) =>
      dataSources.TicketController.store(args),

    updateTicket: (_, args, { dataSources }) =>
      dataSources.TicketController.update(args),

    deleteTicket: (_, args, { dataSources }) =>
      dataSources.TicketController.destroy(args),
  },
};
