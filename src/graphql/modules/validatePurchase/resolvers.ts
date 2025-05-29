export default {
  Mutation: {
    validatePurchase: async (_, args, { dataSources }) => {
      try {
        return await dataSources.ValidatePurchaseController.validate(args);
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
};
