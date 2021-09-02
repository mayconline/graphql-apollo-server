const User = require('../models/User');

const bcrypt = require('bcrypt');
const { setToken } = require('../graphql/utils/shareFunc');

module.exports = {
  show: async args => {
    let user = await User.findOne({
      email: args.input.email.toLowerCase(),
    })
      .select('+password')
      .lean();

    if (!user) throw new Error('User or Password Invalid');

    let isValidPassword = await bcrypt.compare(
      args.input.password,
      user.password,
    );
    if (!isValidPassword) throw new Error('User or Password Invalid');

    if (user.active === false) throw new Error('User Inactive');

    const token = await setToken(user._id, user.role);

    return {
      ...user,
      token,
    };
  },
  update: async (args, hasToken) => {
    let user = await User.findById(hasToken._id);
    if (!user) throw new Error('User Not Exists');

    if (args.input.role == 'ADM' && hasToken.role != 'ADM')
      throw new Error('User Unauthorized');

    await user.updateOne({
      role: args.input.role,
      plan: args.input.plan,
    });

    user = await User.findById(hasToken._id).lean();

    const token = await setToken(user._id, user.role);

    return { ...user, token };
  },
  reactivateUser: async (args, hasToken) => {
    if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');

    let user = await User.findById(args.input._id);
    if (!user) throw new Error('User Not Exists');

    await user.updateOne({
      active: args.input.active,
    });

    return !!user;
  },
};
