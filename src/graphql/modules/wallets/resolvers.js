const { users, tickets, wallets } = require('../../../mocks');

module.exports = {
  Wallet: {
    user: (wallets) => {
      return users.find((user) => user._id === wallets.user);
    },
    ticket: (wallets) => {
      return wallets.ticket.map((wallet) =>
        tickets.find((ticket) => ticket._id === wallet)
      );
    },
  },
  Query: {
    wallets: () => wallets,
    getWalletByUser: (_, args) => {
      return wallets.filter((wallet) => wallet.user === parseInt(args.userID));
    },
  },
};
