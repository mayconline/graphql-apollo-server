const Wallet = require('../models/Wallet');
const Ticket = require('../models/Ticket');

const {
  getArraySortByParams,
  formatSymbol,
} = require('../graphql/utils/shareFunc');

module.exports = {
  index: async hasToken => {
    if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');

    let tickets = await Ticket.find().sort('-updatedAt').lean();

    return tickets;
  },

  show: async (args, hasToken) => {
    let wallet = await Wallet.findById(args.walletID).populate('ticket');

    if (!wallet) throw new Error('Wallet Not Found');

    let isSameUser = hasToken._id == wallet.user;
    if (!isSameUser) throw new Error('User Unauthorized');

    let sorted = await getArraySortByParams(wallet.ticket, args.sort);

    let ticketLengthOnWallet = await wallet.ticket.length;

    if (hasToken.role == 'USER' && ticketLengthOnWallet >= 16) {
      let showTickets = sorted.filter((_, index) => index <= 15);

      return showTickets;
    }

    return sorted;
  },

  store: async (args, hasToken) => {
    let wallet = await Wallet.findById(args.walletID).populate('ticket');
    if (!wallet) throw new Error('Wallet Not Found');

    let isSameUser = hasToken._id == wallet.user;
    if (!isSameUser) throw new Error('User Unauthorized');

    let sameSymbol = await wallet.ticket.find(
      ({ symbol }) => formatSymbol(symbol) == formatSymbol(args.input.symbol),
    );
    if (!!sameSymbol) throw new Error('Ticket Exists');

    let ticketLengthOnWallet = await wallet.ticket.length;

    if (hasToken.role == 'USER' && ticketLengthOnWallet >= 16)
      throw new Error('Tickets limited to 16 items');

    let ticket = await Ticket.create({
      symbol: args.input.symbol,
      name: args.input.name,
      quantity: args.input.quantity,
      averagePrice: args.input.averagePrice,
      grade: args.input.grade,
    });

    await wallet.ticket.push(ticket._id);
    await wallet.save();

    return ticket;
  },

  update: async args => {
    let ticket = await Ticket.findById(args._id);
    if (!ticket) throw new Error('Ticket Not Found');

    await ticket.updateOne({
      symbol: args.input.symbol,
      name: args.input.name,
      quantity: args.input.quantity,
      averagePrice: args.input.averagePrice,
      grade: args.input.grade,
    });

    ticket = await Ticket.findById(args._id);

    return ticket;
  },

  destroy: async (args, hasToken) => {
    let ticket = await Ticket.findById(args._id);
    if (!ticket) throw new Error('Ticket Not Found');

    let wallet = await Wallet.findById(args.walletID);
    if (!wallet) throw new Error('Wallet Not Found');

    let isSameUser = hasToken._id == wallet.user;
    if (!isSameUser) throw new Error('User Unauthorized');

    await wallet.ticket.splice(wallet.ticket.indexOf(ticket._id), 1);
    await wallet.save();

    await ticket.remove();

    return !!ticket;
  },
};
