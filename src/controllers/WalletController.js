const { wallets } = require('../graphql/utils/mocks/dataMock');

module.exports = {
  index: () => wallets,
  showOne: args => wallets.find(wallet => wallet._id === args._id),
  show: args => wallets.filter(wallet => wallet.user === args.userID),
  store: args => {
    let newWallet = {
      _id: String(Math.random()),
      user: args.input.userID,
      description: args.input.description,
      sumCostWallet: 0,
      sumAmountWallet: 0,
      sumGradeWallet: 0,
      ticket: [],
    };
    wallets.push(newWallet);
    return newWallet;
  },
  update: args => {
    let wallet = wallets.find(wallet => wallet._id === args._id);
    if (!wallet) throw new Error('Wallet Not Found');

    wallet = {
      ...wallet,
      description: args.input.description,
    };
    wallets.splice(wallets.indexOf(wallet), 1, wallet);

    return wallet;
  },
  destroy: args => {
    let wallet = wallets.find(wallet => wallet._id === args._id);
    if (!wallet) throw new Error('Wallet Not Found');

    wallets.splice(wallets.indexOf(wallet), 1);
    return !!wallet;
  },
};
