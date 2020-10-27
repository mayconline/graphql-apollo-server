const { tickets, wallets } = require('../graphql/utils/mocks/dataMock');

module.exports = {
  index: hasToken => {
    if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');
    return tickets;
  },

  show: args => {
    let wallet = wallets.find(wallet => wallet._id === args.walletID);
    if (!wallet) throw new Error('Wallet Not Found');

    return wallet.ticket.map(ticketID =>
      tickets.find(ticket => ticket._id === ticketID),
    );
  },

  store: (args, hasToken) => {
    let wallet = wallets.find(wallet => wallet._id === args.walletID);

    if (!wallet) throw new Error('Wallet Not Found');
    if (hasToken._id !== wallet.user) throw new Error('User Unauthorized');

    let ticket = {
      _id: String(Math.random()),
      symbol: args.input.symbol,
      name: args.input.name,
      quantity: args.input.quantity,
      averagePrice: args.input.averagePrice,
      grade: args.input.grade,
    };

    tickets.push(ticket);
    wallet.ticket.push(ticket._id);

    return ticket;
  },

  update: args => {
    let ticket = tickets.find(ticket => ticket._id === args._id);
    if (!ticket) throw new Error('Ticket Not Found');

    updateTicket = {
      ...ticket,
      symbol: args.input.symbol,
      name: args.input.name,
      quantity: args.input.quantity,
      averagePrice: args.input.averagePrice,
      grade: args.input.grade,
    };

    tickets.splice(tickets.indexOf(ticket), 1, updateTicket);

    return updateTicket;
  },

  destroy: (args, hasToken) => {
    let ticket = tickets.find(ticket => ticket._id === args._id);
    if (!ticket) throw new Error('Ticket Not Found');

    let wallet = wallets.find(wallet => wallet._id === args.walletID);
    if (!wallet) throw new Error('Wallet Not Found');
    if (hasToken._id !== wallet.user) throw new Error('User Unauthorized');

    wallet.ticket.splice(wallet.ticket.indexOf(ticket._id), 1);
    tickets.splice(tickets.indexOf(ticket), 1);
    return !!ticket;
  },
};
