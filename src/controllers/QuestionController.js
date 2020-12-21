const Question = require('../models/Question');
const User = require('../models/User');

module.exports = {
  index: async () => {
    let questions = await Question.find().sort('createdAt').lean();

    return questions;
  },
  store: async (args, hasToken) => {
    let user = await User.findById(hasToken._id);
    if (!user) throw new Error('User Not Exists');

    if (hasToken.role != 'ADM') throw new Error('User Unauthorized');

    let newAsk = await Question.create({
      ...args.input,
    });

    return newAsk;
  },
};
