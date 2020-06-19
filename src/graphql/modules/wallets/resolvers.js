const { users, tickets, wallets } = require('../../../mocks');

const getTicketsArray = wallet =>
  wallet.ticket.map(ticketID =>
    tickets.find(ticket => ticket._id === ticketID),
  );

module.exports = {
  Wallet: {
    user: wallets => {
      return users.find(user => user._id === wallets.user);
    },
    ticket: wallets => getTicketsArray(wallets),
    sumGradeWallet: wallets => {
      let ticketArray = getTicketsArray(wallets);

      let sum = ticketArray.length
        ? ticketArray
            .map(ticket => ticket.grade)
            .reduce((acc, cur) => acc + cur)
        : 0;

      return sum;
    },
    sumCostWallet: wallets => {
      let ticketArray = getTicketsArray(wallets);

      let sum = ticketArray.length
        ? ticketArray
            .map(ticket => ticket.quantity * ticket.averagePrice)
            .reduce((acc, cur) => acc + cur)
        : 0;

      return sum;
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
