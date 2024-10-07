import bcrypt from 'bcrypt';
import User from '../models/User';
import Wallet from '../models/Wallet';
import Ticket from '../models/Ticket';

import RefreshToken from './RefreshToken';
import { ITokenProps, IUserControllerArgs } from '../types';

export default {
  index: async (hasToken: ITokenProps) => {
    try {
      if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');

      const users = await User.find().sort('-updatedAt').lean();

      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  show: async (hasToken: ITokenProps) => {
    try {
      const user = await User.findById(hasToken._id).lean();
      if (!user) throw new Error('User Not Exists');

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  store: async (args: IUserControllerArgs) => {
    try {
      const user = await User.findOne({
        email: args.input.email.toLowerCase(),
      });
      if (user) throw new Error('User Exists');

      let newUser: any = await User.create({
        email: args.input.email.toLowerCase(),
        password: await bcrypt.hash(args.input.password, 10),
        checkTerms: args.input.checkTerms,
      });

      const tokens = await RefreshToken.store(newUser._id, newUser.role);

      newUser = {
        ...newUser._doc,
        ...tokens,
        password: null,
      };

      return newUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  update: async (args: IUserControllerArgs, hasToken: ITokenProps) => {
    try {
      let user: any = await User.findById(hasToken._id).select('+password');
      if (!user) throw new Error('User Not Exists');

      const { email, password, ...rest } = await args.input;

      const data = {
        email: !email ? user.email : email.toLowerCase(),
        password: !password ? user.password : await bcrypt.hash(password, 10),
        ...rest,
      };

      await user.updateOne(data);

      user = await User.findById(hasToken._id).lean();

      const tokens = await RefreshToken.store(user?._id!, user?.role!);

      return { ...user, ...tokens };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  destroy: async (args: IUserControllerArgs, hasToken: ITokenProps) => {
    try {
      if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');

      const user = await User.findById(args._id);
      if (!user) throw new Error('User Not Exists');

      const wallets = await Wallet.find({ user: args._id });

      const ticketsIDs = wallets
        .map(wallet => wallet.ticket)
        .reduce((acc, cur) => [...acc, ...cur], []);

      const walletsIDs = wallets.map(wallet => wallet._id);

      await Ticket.deleteMany({
        _id: {
          $in: ticketsIDs,
        },
      });

      await Wallet.deleteMany({
        _id: {
          $in: walletsIDs,
        },
      });

      const refreshToken = await RefreshToken.show(user._id);
      if (refreshToken) await RefreshToken.destroy(refreshToken._id);

      await user.deleteOne();
      return !!user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
