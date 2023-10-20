import { randomBytes } from 'node:crypto';
import bcrypt from 'bcrypt';
import User from '../models/User';
import RecoveryPassword from '../models/RecoveryPassword';
import { recoveryPasswordTemplate } from '../templates-email/RecoveryPasswordTemplate';
import SendGrid from '../services/sendgrid';
import {
  IRecoveryPasswordResetControllerArgs,
  IRecoveryPasswordSendControllerArgs,
  ITokenProps,
} from '../types';

export default {
  index: async (hasToken: ITokenProps) => {
    try {
      if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');

      const recoveryList = await RecoveryPassword.find().lean();

      return recoveryList;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  show: async (args: IRecoveryPasswordSendControllerArgs) => {
    try {
      const user = await User.findOne({
        email: args.input.email.toLowerCase(),
      }).lean();

      if (!user) throw new Error('User Not Exists');

      const isSameEmail = await RecoveryPassword.findOne({
        email: user.email,
      });

      if (isSameEmail) throw new Error('Email Already Send');

      const cryptoBytes = randomBytes(3).toString('hex');

      const { html } = await recoveryPasswordTemplate(user.email, cryptoBytes);

      const hasSend = await SendGrid.send(
        user.email,
        'Código para redefinição de senha',
        html,
      );

      if (!hasSend) throw new Error('Failed SendGrid');

      const recovery = await RecoveryPassword.create({
        email: user.email,
        code: cryptoBytes.toLowerCase(),
      });

      return !!recovery;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  update: async (args: IRecoveryPasswordResetControllerArgs) => {
    try {
      const recovery = await RecoveryPassword.findOne({
        email: args.input.email.toLowerCase(),
        code: args.input.code.toLowerCase(),
      });

      if (!recovery) throw new Error('Code Invalid or Expired');

      const user = await User.findOne({
        email: args.input.email.toLowerCase(),
      });

      if (!user) throw new Error('User Not Exists');

      const updateUser = await user.updateOne({
        password: await bcrypt.hash(args.input.password, 10),
      });

      await recovery.deleteOne();

      return !!updateUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
