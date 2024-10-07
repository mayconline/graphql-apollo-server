import bcrypt from 'bcrypt';
import User from '../models/User';
import { IAuthControllerArgs, ITokenProps } from '../types';
import RefreshToken from './RefreshToken';

export default {
  show: async (args: IAuthControllerArgs) => {
    try {
      const user = await User.findOne({
        email: args.input.email.toLowerCase(),
      })
        .select('+password')
        .lean();

      if (!user) throw new Error('User or Password Invalid');

      const isValidPassword = await bcrypt.compare(
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
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  update: async (args: IAuthControllerArgs, hasToken: ITokenProps) => {
    try {
      let user: any = await User.findById(hasToken._id);
      if (!user) throw new Error('User Not Exists');

      if (args.input.role === 'ADM' && hasToken.role !== 'ADM') {
        throw new Error('User Unauthorized');
      }

      await user.updateOne({
        role: args.input.role,
        plan: args.input.plan,
      });

      user = await User.findById(hasToken._id).lean();

      const tokens = await RefreshToken.store(user?._id!, user?.role!);

      return { ...user, ...tokens };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  reactivateUser: async (args: IAuthControllerArgs, hasToken: ITokenProps) => {
    try {
      if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');

      const user = await User.findById(args.input._id);
      if (!user) throw new Error('User Not Exists');

      await user.updateOne({
        active: args.input.active,
      });

      return !!user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
