const { tickets, wallets } = require('../graphql/utils/mocks/dataMock');

module.exports = {
  index: () => tickets,

  show: args => {
    let wallet = wallets.find(wallet => wallet._id === args.walletID);

    return wallet.ticket.map(ticketID =>
      tickets.find(ticket => ticket._id === ticketID),
    );
  },

  store: args => {
    let wallet = wallets.find(wallet => wallet._id === args.input.walletID);
    if (!wallet) throw new Error('Wallet Not Found');

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

    ticket = {
      ...ticket,
      symbol: args.input.symbol,
      name: args.input.name,
      quantity: args.input.quantity,
      averagePrice: args.input.averagePrice,
      grade: args.input.grade,
    };

    tickets.splice(tickets.indexOf(ticket), 1, ticket);

    return ticket;
  },

  destroy: args => {
    let ticket = tickets.find(ticket => ticket._id === args._id);
    if (!ticket) throw new Error('Ticket Not Found');

    let wallet = wallets.find(wallet => wallet._id === args.walletID);
    if (!wallet) throw new Error('Wallet Not Found');

    wallet.ticket.splice(wallet.ticket.indexOf(ticket._id), 1);
    tickets.splice(tickets.indexOf(ticket), 1);
    return !!ticket;
  },
};
