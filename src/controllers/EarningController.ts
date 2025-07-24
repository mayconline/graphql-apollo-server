import Earning from '../models/Earning';
import Wallet from '../models/Wallet';
import type {
  IEarningMutationControllerArgs,
  IEarningQueryControllerArgs,
  ITokenProps,
} from '../types';
import {
  getArraySortByParams,
  getSumAmountEarning,
  getSumByUnicProp,
  getSumCostWallet,
} from '../utils/shareFunc';

const index = async (
  args: IEarningQueryControllerArgs,
  hasToken: ITokenProps
) => {
  try {
    if (hasToken.role === 'USER') {
      throw new Error('User Unauthorized');
    }

    const wallet = await Wallet.findById(args.walletID)
      .populate('earning')
      .populate('ticket');
    if (!wallet) {
      throw new Error('Wallet Not Found');
    }

    const isSameUserOrAdm =
      hasToken._id === wallet.user?.toString() || hasToken.role === 'ADM';
    if (!isSameUserOrAdm) {
      throw new Error('User Unauthorized');
    }

    const accEarningsByYear = getSumByUnicProp(
      wallet.earning,
      'year',
      'amount'
    );

    return getArraySortByParams(accEarningsByYear, 'year');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const show = async (
  args: IEarningQueryControllerArgs,
  hasToken: ITokenProps
) => {
  try {
    if (hasToken.role === 'USER') {
      throw new Error('User Unauthorized');
    }

    const wallet = await Wallet.findById(args.walletID).populate('earning');
    if (!wallet) {
      throw new Error('Wallet Not Found');
    }

    const isSameUserOrAdm =
      hasToken._id === wallet.user?.toString() || hasToken.role === 'ADM';
    if (!isSameUserOrAdm) {
      throw new Error('User Unauthorized');
    }

    if (!wallet.earning.length) {
      const emptyArray = Array.from({ length: 12 }, (_, index) => ({
        _id: index + 1,
        year: args.year,
        month: index + 1,
        amount: 0,
      }));

      return emptyArray;
    }

    const currentYearEarnings = wallet.earning.filter(
      (earning: any) => earning.year === args.year
    );

    if (currentYearEarnings.length !== 12) {
      const autoCompletedEarnings = Array.from({ length: 12 }, (_, index) => {
        const currentIndex = currentYearEarnings.find(
          (current: any) => current.month === index + 1
        );

        return (
          currentIndex || {
            _id: index + 1,
            year: args.year,
            month: index + 1,
            amount: 0,
          }
        );
      });

      return autoCompletedEarnings;
    }

    return getArraySortByParams(currentYearEarnings, 'month', true);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const store = async (
  args: IEarningMutationControllerArgs,
  hasToken: ITokenProps
) => {
  try {
    const wallet = await Wallet.findById(args.walletID).populate('earning');
    if (!wallet) {
      throw new Error('Wallet Not Found');
    }

    const isSameUser = hasToken._id === wallet.user?.toString();
    if (!isSameUser) {
      throw new Error('User Unauthorized');
    }

    const isSameEarning = wallet.earning.some(
      (earning: any) =>
        earning.year === args.input.year && earning.month === args.input.month
    );

    if (isSameEarning) {
      throw new Error('Earning Exists');
    }

    const earning = await Earning.create({
      year: args.input.year,
      month: args.input.month,
      amount: args.input.amount,
    });

    await wallet.earning.push(earning._id);
    await wallet.save();

    return earning;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const update = async (
  args: IEarningMutationControllerArgs,
  hasToken: ITokenProps
) => {
  try {
    if (hasToken.role === 'USER') {
      throw new Error('User Unauthorized');
    }

    let earning = await Earning.findById(args._id);

    if (!earning) {
      return await store(args, hasToken);
    }

    await earning.updateOne({
      amount: args.input.amount,
    });

    earning = await Earning.findById(args._id);

    return earning;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const count = async (
  args: IEarningQueryControllerArgs,
  hasToken: ITokenProps
) => {
  try {
    const currentYearArray = await show(
      { ...args, year: Number(args.year) },
      hasToken
    );

    const oldYearArray = await show(
      { ...args, year: Number(args.year) - 1 },
      hasToken
    );

    const wallet = await Wallet.findById(args.walletID)
      .populate('earning')
      .populate('ticket');
    if (!wallet) {
      throw new Error('Wallet Not Found');
    }

    const sumCurrentYear = await getSumAmountEarning(currentYearArray);
    const sumOldYear = await getSumAmountEarning(oldYearArray);
    const sumTotalEarnings = await getSumAmountEarning(wallet.earning);
    const sumCostWallet = (await getSumCostWallet(wallet.ticket)) || 1;

    const yieldOnCost = (sumTotalEarnings / sumCostWallet) * 100;

    return {
      sumCurrentYear,
      sumOldYear,
      sumTotalEarnings,
      yieldOnCost,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default {
  index,
  show,
  store,
  update,
  count,
};
