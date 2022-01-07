const Wallet = require('../models/Wallet');
const Earning = require('../models/Earning');

const {
  getArraySortByParams,
  getSumAmountEarning,
} = require('../graphql/utils/shareFunc');

module.exports = {
  show: async (args, hasToken) => {
    if (hasToken.role == 'USER') throw new Error('User Unauthorized');

    let wallet = await Wallet.findById(args.walletID).populate('earning');
    if (!wallet) throw new Error('Wallet Not Found');

    let isSameUserOrAdm =
      hasToken._id == wallet.user || hasToken.role === 'ADM';
    if (!isSameUserOrAdm) throw new Error('User Unauthorized');

    if (!wallet.earning.length) {
      let emptyArray = Array.from({ length: 12 }, (_, index) => ({
        _id: index + 1,
        year: args.year,
        month: index + 1,
        amount: 0,
      }));

      return emptyArray;
    }

    let currentYearEarnings = wallet.earning.filter(
      earning => earning.year == args.year,
    );

    if (currentYearEarnings.length != 12) {
      let autoCompletedEarnings = Array.from({ length: 12 }, (_, index) => {
        let currentIndex = currentYearEarnings.find(
          current => current.month === index + 1,
        );

        return currentIndex
          ? currentIndex
          : {
              _id: index + 1,
              year: args.year,
              month: index + 1,
              amount: 0,
            };
      });

      return autoCompletedEarnings;
    }

    return getArraySortByParams(currentYearEarnings, 'month', true);
  },

  store: async (args, hasToken) => {
    let wallet = await Wallet.findById(args.walletID).populate('earning');
    if (!wallet) throw new Error('Wallet Not Found');

    let isSameUser = hasToken._id == wallet.user;
    if (!isSameUser) throw new Error('User Unauthorized');

    let isSameEarning = wallet.earning.some(
      earning =>
        earning.year == args.input.year && earning.month == args.input.month,
    );

    if (isSameEarning) throw new Error('Earning Exists');

    let earning = await Earning.create({
      year: args.input.year,
      month: args.input.month,
      amount: args.input.amount,
    });

    await wallet.earning.push(earning._id);
    await wallet.save();

    return earning;
  },

  update: async (args, hasToken) => {
    if (hasToken.role == 'USER') throw new Error('User Unauthorized');

    let earning = await Earning.findById(args._id);

    if (!earning) {
      return await module.exports.store(args, hasToken);
    }

    await earning.updateOne({
      amount: args.input.amount,
    });

    earning = await Earning.findById(args._id);

    return earning;
  },

  count: async (args, hasToken) => {
    const currentYearArray = await module.exports.show(
      { ...args, year: Number(args.year) },
      hasToken,
    );

    const oldYearArray = await module.exports.show(
      { ...args, year: Number(args.year) - 1 },
      hasToken,
    );

    const sumCurrentYear = await getSumAmountEarning(currentYearArray);
    const sumOldYear = await getSumAmountEarning(oldYearArray);

    return {
      sumCurrentYear,
      sumOldYear,
    };
  },
};
