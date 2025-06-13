export default {
  Query: {
    users: async (_, __, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.UserController.index(hasToken?.decoded);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    getUserByToken: async (_, __, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.UserController.show(hasToken?.decoded);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createUser: async (_, args, { dataSources }) => {
      try {
        return await dataSources.UserController.store(args);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    updateUser: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.UserController.update(args, hasToken?.decoded);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    deleteUser: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.UserController.destroy(
          args,
          hasToken?.decoded,
        );
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
