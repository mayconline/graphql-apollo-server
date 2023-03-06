import User from '../models/User';
import RecoveryPassword from '../models/RecoveryPassword';
import { recovery_password_template } from '../templates-email/RecoveryPasswordTemplate';
import SendGrid from '../services/sendgrid';
import { randomBytes } from 'node:crypto';
import bcrypt from 'bcrypt';

export default {
  index: async hasToken => {
    if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');

    const recoveryList = await RecoveryPassword.find().lean();

    return recoveryList;
  },

  show: async args => {
    let user = await User.findOne({
      email: args.input.email.toLowerCase(),
    }).lean();

    if (!user) throw new Error('User Not Exists');

    const isSameEmail = await RecoveryPassword.findOne({
      email: user.email,
    });

    if (isSameEmail) throw new Error('Email Already Send');

    const cryptoBytes = randomBytes(3).toString('hex');

    const { html } = await recovery_password_template(user.email, cryptoBytes);

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
  },

  update: async args => {
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
  },
};
