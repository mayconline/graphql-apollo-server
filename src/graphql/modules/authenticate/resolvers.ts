export default {
  Mutation: {
    updateRole: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) {
          throw new Error('Token Not Exists');
        }

        return await dataSources.AuthController.update(args, hasToken?.decoded);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    login: async (_, args, { dataSources }) => {
      try {
        return await dataSources.AuthController.show(args);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    reactivateUser: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) {
          throw new Error('Token Not Exists');
        }

        return await dataSources.AuthController.reactivateUser(
          args,
          hasToken?.decoded
        );
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
