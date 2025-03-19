import {
  getSumAmountWallet,
  getSumCostWallet,
  getSumGradeWallet,
  getPercentVariation,
} from '../../../utils/shareFunc';

export default {
  Wallet: {
    user: async (wallets, __, { dataSources }) => {
      try {
        return await dataSources.UserController.show({ _id: wallets.user });
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    ticket: async (wallets, __, { dataSources, hasToken }) => {
      try {
        return await dataSources.TicketController.show(
          { walletID: wallets._id },
          hasToken,
        );
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    sumGradeWallet: async (wallets, __, { dataSources, hasToken }) => {
      try {
        const ticketArray = await dataSources.TicketController.show(
          {
            walletID: wallets._id,
          },
          hasToken,
        );

        return getSumGradeWallet(ticketArray);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    sumCostWallet: async (wallets, __, { dataSources, hasToken }) => {
      try {
        const ticketArray = await dataSources.TicketController.show(
          {
            walletID: wallets._id,
          },
          hasToken,
        );

        return getSumCostWallet(ticketArray);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    sumAmountWallet: async (wallets, __, { dataSources, hasToken }) => {
      try {
        const ticketArray = await dataSources.TicketController.show(
          {
            walletID: wallets._id,
          },
          hasToken,
        );

        const currentArray =
          await dataSources.finance.getCurrentFinanceByTickets(ticketArray);

        return getSumAmountWallet(currentArray);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    percentRentabilityWallet: async (
      wallets,
      __,
      { dataSources, hasToken },
    ) => {
      try {
        const ticketArray = await dataSources.TicketController.show(
          {
            walletID: wallets._id,
          },
          hasToken,
        );

        const currentArray =
          await dataSources.finance.getCurrentFinanceByTickets(ticketArray);

        const SumAmount = getSumAmountWallet(currentArray);
        const SumCost = getSumCostWallet(ticketArray);

        return getPercentVariation(SumCost, SumAmount);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    percentPositionWallet: async (wallets, __, { dataSources, hasToken }) => {
      try {
        const ticketArray = await dataSources.TicketController.show(
          {
            walletID: wallets._id,
          },
          hasToken,
        );

        const currentArray =
          await dataSources.finance.getCurrentFinanceByTickets(ticketArray);

        const SumAmount = getSumAmountWallet(currentArray);
        const { sumAmountAllWallet } = wallets;

        const percent = (SumAmount * 100) / sumAmountAllWallet || 0;

        return percent;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Query: {
    wallets: async (_, __, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.WalletController.index(hasToken);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getWalletById: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.WalletController.showOne(args, hasToken);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getWalletByUser: async (_, __, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        const AllWallets = await dataSources.WalletController.show(hasToken);

        const AllWalletsIDS = await AllWallets.map(wallets => wallets._id);

        const AllTickets = await Promise.all(
          AllWalletsIDS.map(async walletID => {
            const filteredTicket = await dataSources.TicketController.show(
              { walletID },
              hasToken,
            );

            return filteredTicket;
          }),
        );

        const ticketArray = await AllTickets.reduce(
          (acc, cur) => acc.concat(cur),
          [],
        );

        const currentArray =
          await dataSources.finance.getCurrentFinanceByTickets(ticketArray);

        const SumAllAmount = getSumAmountWallet(currentArray);

        const res = AllWallets.map(wallet => ({
          ...wallet._doc,
          sumAmountAllWallet: SumAllAmount,
        }));

        return res;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createWallet: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.WalletController.store(args, hasToken);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    updateWallet: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.WalletController.update(args, hasToken);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    deleteWallet: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.WalletController.destroy(args, hasToken);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
