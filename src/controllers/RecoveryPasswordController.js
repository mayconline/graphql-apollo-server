const User = require('../models/User');
const RecoveryPassword = require('../models/RecoveryPassword');
const {
  recovery_password_template,
} = require('../templates-email/RecoveryPasswordTemplate');
const SendGrid = require('../services/sendgrid');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

module.exports = {
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

    let cryptoBytes = crypto.randomBytes(3);
    cryptoBytes = cryptoBytes.toString('hex');

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

    let user = await User.findOne({
      email: args.input.email.toLowerCase(),
    });

    let updateUser = await user.updateOne({
      password: await bcrypt.hash(args.input.password, 10),
    });

    await recovery.remove();

    return !!updateUser;
  },
};
