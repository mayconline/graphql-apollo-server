import User from '../models/User';
import bcrypt from 'bcrypt';
import RefreshToken from './RefreshToken';

export default {
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

    const tokens = await RefreshToken.store(user._id, user.role);

    return {
      ...user,
      ...tokens,
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

    const tokens = await RefreshToken.store(user?._id!, user?.role!);

    return { ...user, ...tokens };
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
