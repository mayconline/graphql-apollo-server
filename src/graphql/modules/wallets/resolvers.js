const { users, tickets, wallets } = require('../../../mocks');
const { getCurrentFinanceByTickets } = require('../../../services/finance');

const getTicketsArray = wallet =>
  wallet.ticket.map(ticketID =>
    tickets.find(ticket => ticket._id === ticketID),
  );

module.exports = {
  Wallet: {
    user: wallets => users.find(user => user._id === wallets.user),

    ticket: wallets => getTicketsArray(wallets),

    sumGradeWallet: wallets =>
      getTicketsArray(wallets).reduce((acc, cur) => acc + cur.grade, 0),

    sumCostWallet: wallets =>
      getTicketsArray(wallets).reduce(
        (acc, cur) => acc + cur.quantity * cur.averagePrice,
        0,
      ),

    sumAmountWallet: async wallets => {
      const ticketArray = getTicketsArray(wallets);
      const currentArray = await getCurrentFinanceByTickets(ticketArray);

      return currentArray.reduce(
        (acc, cur) => acc + cur.quantity * cur.regularMarketPrice,
        0,
      );
    },
  },
  Query: {
    wallets: () => wallets,
    getWalletByUser: (_, args) => {
      return wallets.filter(wallet => wallet.user === parseInt(args.userID));
    },
  },
  Mutation: {
    createWallet: (_, args) => {
      let newWallet = {
        _id: String(Math.random()),
        user: parseInt(args.input.userID),
        description: args.input.description,
        sumCostWallet: 0,
        sumAmountWallet: 0,
        sumGradeWallet: 0,
        ticket: [],
      };
      wallets.push(newWallet);
      return newWallet;
    },
    updateWallet: (_, args) => {
      let wallet = wallets.find(wallet => wallet._id === args._id);
      if (wallet) wallets.splice(wallets.indexOf(wallet), 1);

      wallet = {
        ...wallet,
        description: args.input.description,
      };

      wallets.push(wallet);
      return wallet;
    },
    deleteWallet: (_, args) => {
      let wallet = wallets.find(wallet => wallet._id === args._id);
      if (wallet) wallets.splice(wallets.indexOf(wallet), 1);
      return !!wallet;
    },
  },
};
