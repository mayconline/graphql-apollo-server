module.exports = {
  Query: {
    tickets: (_, __, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.TicketController.index(hasToken),

    getTicketsByWallet: (_, args, { dataSources }) =>
      dataSources.TicketController.show(args),
  },
  Mutation: {
    createTicket: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.TicketController.store(args, hasToken),

    updateTicket: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.TicketController.update(args),

    deleteTicket: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.TicketController.destroy(args, hasToken),
  },
};
