const { wallets } = require('../graphql/utils/mocks/dataMock');

module.exports = {
  index: hasToken => {
    if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');
    return wallets;
  },
  showOne: (args, hasToken) => {
    let wallet = wallets.find(wallet => wallet._id === args._id);

    if (!wallet) throw new Error('Wallet Not Found');
    if (hasToken._id !== wallet.user) throw new Error('User Unauthorized');

    return wallet;
  },
  show: hasToken => wallets.filter(wallet => wallet.user === hasToken._id),
  store: (args, hasToken) => {
    let newWallet = {
      _id: String(Math.random()),
      user: hasToken._id,
      description: args.input.description,
      sumCostWallet: 0,
      sumAmountWallet: 0,
      sumGradeWallet: 0,
      ticket: [],
    };
    wallets.push(newWallet);
    return newWallet;
  },
  update: (args, hasToken) => {
    let wallet = wallets.find(wallet => wallet._id === args._id);

    if (!wallet) throw new Error('Wallet Not Found');
    if (hasToken._id !== wallet.user) throw new Error('User Unauthorized');

    let updateWallet = {
      ...wallet,
      description: args.input.description,
    };
    wallets.splice(wallets.indexOf(wallet), 1, updateWallet);

    return updateWallet;
  },
  destroy: (args, hasToken) => {
    let wallet = wallets.find(wallet => wallet._id === args._id);
    if (!wallet) throw new Error('Wallet Not Found');
    if (hasToken._id !== wallet.user) throw new Error('User Unauthorized');

    wallets.splice(wallets.indexOf(wallet), 1);
    return !!wallet;
  },
};
