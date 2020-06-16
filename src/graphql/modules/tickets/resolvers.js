const { tickets, wallets } = require('../../../mocks');

module.exports = {
  Query: {
    tickets: () => tickets,
  },
  Mutation: {
    createTicket: (_, args) => {
      let wallet = wallets.find(wallet => wallet._id === args.input.walletID);
      if (!wallet) return null;

      let ticket = {
        _id: String(Math.random()),
        symbol: args.input.symbol,
        quantity: args.input.quantity,
        averagePrice: args.input.averagePrice,
        grade: args.input.grade,
      };

      tickets.push(ticket);
      wallet.ticket.push(ticket._id);

      return ticket;
    },
    updateTicket: (_, args) => {
      let ticket = tickets.find(ticket => ticket._id === parseInt(args._id));
      if (ticket) tickets.splice(tickets.indexOf(ticket), 1);

      ticket = {
        ...ticket,
        symbol: args.input.symbol,
        quantity: args.input.quantity,
        averagePrice: args.input.averagePrice,
        grade: args.input.grade,
      };

      tickets.push(ticket);
      return ticket;
    },
    deleteTicket: (_, args) => {
      let ticket = tickets.find(ticket => ticket._id === parseInt(args._id));
      let wallet = wallets.find(wallet => wallet._id === args.walletID);

      if (wallet) wallet.ticket.splice(wallet.ticket.indexOf(ticket._id), 1);
      if (ticket) tickets.splice(tickets.indexOf(ticket), 1);
      return !!ticket;
    },
  },
};
