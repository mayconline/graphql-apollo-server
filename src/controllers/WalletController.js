const Wallet = require('../models/Wallet');

module.exports = {
  index: async hasToken => {
    if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');

    let wallets = await Wallet.find().sort('-updatedAt').lean();

    return wallets;
  },
  showOne: async (args, hasToken) => {
    let wallet = await Wallet.findById(args._id).lean();
    if (!wallet) throw new Error('Wallet Not Found');

    let isSameUser = hasToken._id == wallet.user;
    if (!isSameUser) throw new Error('User Unauthorized');

    return wallet;
  },
  show: async hasToken => {
    let wallet = await Wallet.find({ user: hasToken._id })
      .populate('ticket')
      .populate('user');

    if (!wallet) throw new Error('Wallet Not Found');

    return wallet;
  },
  store: async (args, hasToken) => {
    let newWallet = await Wallet.create({
      user: hasToken._id,
      description: args.input.description,
    });

    newWallet = {
      ...newWallet._doc,
      sumCostWallet: 0,
      sumAmountWallet: 0,
      sumGradeWallet: 0,
    };

    return newWallet;
  },
  update: async (args, hasToken) => {
    let wallet = await Wallet.findById(args._id);
    if (!wallet) throw new Error('Wallet Not Found');

    let isSameUser = hasToken._id == wallet.user;
    if (!isSameUser) throw new Error('User Unauthorized');

    await wallet.updateOne({
      description: args.input.description,
    });

    wallet = await Wallet.findById(args._id).lean();

    return wallet;
  },
  destroy: async (args, hasToken) => {
    let wallet = await Wallet.findById(args._id);
    if (!wallet) throw new Error('Wallet Not Found');

    let isSameUser = hasToken._id == wallet.user;
    if (!isSameUser) throw new Error('User Unauthorized');

    await wallet.remove();
    return !!wallet;
  },
};
