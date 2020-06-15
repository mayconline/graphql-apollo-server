const { users, tickets, wallets } = require('../../../mocks');

module.exports = {
  Wallet: {
    user: wallets => {
      return users.find(user => user._id === wallets.user);
    },
    ticket: wallets => {
      return wallets.ticket.map(wallet =>
        tickets.find(ticket => ticket._id === wallet),
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
        totalValue: 0,
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
