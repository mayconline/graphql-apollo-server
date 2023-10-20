export default {
  Query: {
    tickets: async (_, __, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.TicketController.index(hasToken);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getTicketsByWallet: async (_, args, { dataSources, hasToken }) => {
      try {
        return await dataSources.TicketController.show(args, hasToken);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createTicket: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.TicketController.store(args, hasToken);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    updateTicket: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.TicketController.update(args);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    deleteTicket: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.TicketController.destroy(args, hasToken);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
