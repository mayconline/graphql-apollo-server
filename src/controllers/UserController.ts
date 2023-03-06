import User from '../models/User';
import Wallet from '../models/Wallet';
import Ticket from '../models/Ticket';

import bcrypt from 'bcrypt';
import RefreshToken from './RefreshToken';

export default {
  index: async hasToken => {
    if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');

    let users = await User.find().sort('-updatedAt').lean();

    return users;
  },
  show: async hasToken => {
    let user = await User.findById(hasToken._id).lean();
    if (!user) throw new Error('User Not Exists');

    return user;
  },
  store: async args => {
    let user = await User.findOne({ email: args.input.email.toLowerCase() });
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
  },
  update: async (args, hasToken) => {
    let user = await User.findById(hasToken._id).select('+password');
    if (!user) throw new Error('User Not Exists');

    const { email, password, ...rest } = await args.input;

    let data = {
      email: !email ? user.email : email.toLowerCase(),
      password: !password ? user.password : await bcrypt.hash(password, 10),
      ...rest,
    };

    await user.updateOne(data);

    user = await User.findById(hasToken._id).lean();

    const tokens = await RefreshToken.store(user?._id!, user?.role!);

    return { ...user, ...tokens };
  },
  destroy: async (args, hasToken) => {
    if (hasToken.role != 'ADM') throw new Error('User Unauthorized');

    let user = await User.findById(args._id);
    if (!user) throw new Error('User Not Exists');

    let wallets = await Wallet.find({ user: args._id });

    let ticketsIDs = wallets
      .map(wallet => wallet.ticket)
      .reduce((acc, cur) => [...acc, ...cur], []);

    let walletsIDs = wallets.map(wallet => wallet._id);

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
  },
};
