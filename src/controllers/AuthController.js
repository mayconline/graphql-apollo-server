const { users } = require('../graphql/utils/mocks/dataMock');
const bcrypt = require('bcrypt');
const { setToken } = require('../graphql/utils/shareFunc');

module.exports = {
  show: async args => {
    let user = users.find(
      user => user.email === args.input.email.toLowerCase(),
    );
    if (!user) throw new Error('User or Password Invalid');

    let isValidPassword = await bcrypt.compare(
      args.input.password,
      user.password,
    );
    if (!isValidPassword) throw new Error('User or Password Invalid');

    const token = setToken(user._id, user.role);

    return {
      ...user,
      token,
    };
  },
};
