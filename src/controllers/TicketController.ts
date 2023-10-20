import Wallet from '../models/Wallet';
import Ticket from '../models/Ticket';
import {
  getArraySortByParams,
  formatSymbol,
  getClassTicket,
} from '../utils/shareFunc';
import {
  ITicketMutationControllerArgs,
  ITicketQueryControllerArgs,
  ITokenProps,
} from '../types';

export default {
  index: async (hasToken: ITokenProps) => {
    try {
      if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');

      const tickets = await Ticket.find().sort('-updatedAt').lean();

      return tickets;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  show: async (args: ITicketQueryControllerArgs, hasToken: ITokenProps) => {
    try {
      if (!args?.walletID) throw new Error('Wallet Not Found');

      const wallet = await Wallet.findById(args.walletID).populate('ticket');

      if (!wallet) throw new Error('Wallet Not Found');

      const isSameUserOrAdm =
        hasToken._id === wallet.user?.toString() || hasToken.role === 'ADM';

      if (!isSameUserOrAdm) throw new Error('User Unauthorized');

      const addClassSymbol = wallet.ticket.map((ticket: any) => ({
        ...ticket._doc,
        classSymbol: getClassTicket(formatSymbol(ticket.symbol)),
      }));

      const sorted = await getArraySortByParams(addClassSymbol, 'grade');

      const ticketLengthOnWallet = await wallet.ticket.length;

      if (hasToken.role === 'USER' && ticketLengthOnWallet >= 16) {
        const showTickets = sorted.filter((_, index) => index <= 15);

        return showTickets;
      }

      return sorted;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  store: async (args: ITicketMutationControllerArgs, hasToken: ITokenProps) => {
    try {
      const wallet: any = await Wallet.findById(args.walletID).populate(
        'ticket',
      );
      if (!wallet) throw new Error('Wallet Not Found');

      const isSameUser = hasToken._id === wallet.user?.toString();
      if (!isSameUser) throw new Error('User Unauthorized');

      const sameSymbol = await wallet.ticket.find(
        ({ symbol }) =>
          formatSymbol(symbol) === formatSymbol(args.input.symbol),
      );
      if (sameSymbol) throw new Error('Ticket Exists');

      const ticketLengthOnWallet = await wallet.ticket.length;

      if (hasToken.role === 'USER' && ticketLengthOnWallet >= 16)
        throw new Error('Tickets limit Reached');

      const ticket = await Ticket.create({
        symbol: args.input.symbol,
        name: args.input.name ? args.input.name : args.input.symbol,
        quantity: args.input.quantity,
        averagePrice: args.input.averagePrice,
        grade: args.input.grade,
      });

      await wallet.ticket.push(ticket._id);
      await wallet.save();

      return ticket;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  update: async (args: ITicketMutationControllerArgs) => {
    try {
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
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  destroy: async (
    args: ITicketMutationControllerArgs,
    hasToken: ITokenProps,
  ) => {
    try {
      const ticket = await Ticket.findById(args._id);
      if (!ticket) throw new Error('Ticket Not Found');

      const wallet = await Wallet.findById(args.walletID);
      if (!wallet) throw new Error('Wallet Not Found');

      const isSameUser = hasToken._id === wallet.user?.toString();
      if (!isSameUser) throw new Error('User Unauthorized');

      await wallet.ticket.splice(wallet.ticket.indexOf(ticket._id), 1);
      await wallet.save();

      await ticket.deleteOne();

      return !!ticket;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
