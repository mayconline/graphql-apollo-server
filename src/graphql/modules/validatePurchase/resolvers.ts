export default {
  Mutation: {
    validatePurchase: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.ValidatePurchaseController.validate(args);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
