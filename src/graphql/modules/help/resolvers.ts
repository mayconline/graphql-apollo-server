export default {
  Query: {
    questions: async (_, __, { dataSources }) =>
      await dataSources.QuestionController.index(),
  },
  Mutation: {
    createQuestion: async (_, args, { dataSources, hasToken }) =>
      !hasToken
        ? new Error('Token Not Exists')
        : await dataSources.QuestionController.store(args, hasToken),
  },
};
