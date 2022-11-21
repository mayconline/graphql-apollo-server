import {
  getSumAmountWallet,
  getSumCostWallet,
  getSumGradeWallet,
  getPercentVariation,
} from '../../utils/shareFunc';

export default {
  Wallet: {
    user: (users, __, { dataSources }) =>
      dataSources.UserController.show({ _id: users.user }),

    ticket: (wallets, __, { dataSources, hasToken }) =>
      dataSources.TicketController.show({ walletID: wallets._id }, hasToken),

    sumGradeWallet: async (wallets, __, { dataSources, hasToken }) => {
      const ticketArray = await dataSources.TicketController.show(
        {
          walletID: wallets._id,
        },
        hasToken,
      );
      return getSumGradeWallet(ticketArray);
    },

    sumCostWallet: async (wallets, __, { dataSources, hasToken }) => {
      const ticketArray = await dataSources.TicketController.show(
        {
          walletID: wallets._id,
        },
        hasToken,
      );
      return getSumCostWallet(ticketArray);
    },

    sumAmountWallet: async (wallets, __, { dataSources, hasToken }) => {
      const ticketArray = await dataSources.TicketController.show(
        {
          walletID: wallets._id,
        },
        hasToken,
      );

      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      return getSumAmountWallet(currentArray);
    },
    percentRentabilityWallet: async (
      wallets,
      __,
      { dataSources, hasToken },
    ) => {
      const ticketArray = await dataSources.TicketController.show(
        {
          walletID: wallets._id,
        },
        hasToken,
      );

      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      let SumAmount = getSumAmountWallet(currentArray);
      let SumCost = getSumCostWallet(ticketArray);

      return getPercentVariation(SumCost, SumAmount);
    },
    percentPositionWallet: async (wallets, __, { dataSources, hasToken }) => {
      const ticketArray = await dataSources.TicketController.show(
        {
          walletID: wallets._id,
        },
        hasToken,
      );

      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      let SumAmount = getSumAmountWallet(currentArray);
      let sumAmountAllWallet = wallets.sumAmountAllWallet;

      let percent = (SumAmount * 100) / sumAmountAllWallet || 0;

      return percent;
    },
  },
  Query: {
    wallets: (_, __, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.WalletController.index(hasToken),

    getWalletById: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.WalletController.showOne(args, hasToken),

    getWalletByUser: async (_, __, { dataSources, hasToken }) => {
      if (!hasToken) return new Error('Token Not Exists');

      let AllWallets = await dataSources.WalletController.show(hasToken);

      let AllWalletsIDS = await AllWallets.map(wallets => wallets._id);

      let AllTickets = await Promise.all(
        AllWalletsIDS.map(async walletID => {
          let filteredTicket = await dataSources.TicketController.show(
            { walletID },
            hasToken,
          );

          return filteredTicket;
        }),
      );

      let ticketArray = await AllTickets.reduce(
        (acc, cur) => [...acc, ...cur],
        [],
      );

      const currentArray = await dataSources.finance.getCurrentFinanceByTickets(
        ticketArray,
      );

      let SumAllAmount = getSumAmountWallet(currentArray);

      let res = AllWallets.map(wallet => ({
        ...wallet._doc,
        sumAmountAllWallet: SumAllAmount,
      }));

      return res;
    },
  },
  Mutation: {
    createWallet: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.WalletController.store(args, hasToken),

    updateWallet: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.WalletController.update(args, hasToken),

    deleteWallet: (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : dataSources.WalletController.destroy(args, hasToken),
  },
};
