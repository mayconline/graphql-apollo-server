export default {
  Query: {
    questions: async (_, __, { dataSources }) => {
      try {
        return await dataSources.QuestionController.index();
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createQuestion: async (_, args, { dataSources, hasToken }) => {
      try {
        if (!hasToken) throw new Error('Token Not Exists');

        return await dataSources.QuestionController.store(
          args,
          hasToken?.decoded,
        );
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
