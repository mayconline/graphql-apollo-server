import Question from '../models/Question';
import User from '../models/User';
import type { IQuestionControllerArgs, ITokenProps } from '../types';

export default {
  index: async () => {
    try {
      const questions = await Question.find().sort('createdAt').lean();

      return questions;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  store: async (args: IQuestionControllerArgs, hasToken: ITokenProps) => {
    try {
      const user = await User.findById(hasToken._id);
      if (!user) {
        throw new Error('User Not Exists');
      }

      if (hasToken.role !== 'ADM') {
        throw new Error('User Unauthorized');
      }

      const newAsk = await Question.create({
        ...args.input,
      });

      return newAsk;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
