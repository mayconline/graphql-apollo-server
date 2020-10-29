const User = require('../models/User');

const bcrypt = require('bcrypt');
const { setToken } = require('../graphql/utils/shareFunc');

module.exports = {
  index: async hasToken => {
    if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');

    let users = await User.find().sort('-updatedAt').lean();

    return users;
  },
  show: async hasToken => {
    let user = await User.findById(hasToken._id).lean();
    return user;
  },
  store: async args => {
    let user = await User.findOne({ email: args.input.email.toLowerCase() });
    if (user) throw new Error('User Exists');

    let newUser = await User.create({
      email: args.input.email.toLowerCase(),
      password: await bcrypt.hash(args.input.password, 10),
      checkTerms: args.input.checkTerms,
    });

    const token = await setToken(newUser._id, newUser.role);

    newUser = {
      ...newUser._doc,
      token,
      password: null,
    };

    return newUser;
  },
  update: async (args, hasToken) => {
    let user = await User.findById(hasToken._id).select('+password');
    if (!user) throw new Error('User Not Exists');

    await user.updateOne({
      email: args.input.email.toLowerCase(),
      password: await bcrypt.hash(args.input.password, 10),
      active: args.input.active,
      checkTerms: args.input.checkTerms,
    });

    user = await User.findById(hasToken._id).lean();

    const token = await setToken(user._id, user.role);

    return { ...user, token };
  },
  destroy: async hasToken => {
    let user = await User.findById(hasToken._id);
    if (!user) throw new Error('User Not Exists');

    await user.remove();
    return !!user;
  },
};
