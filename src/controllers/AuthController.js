const { users } = require('../graphql/utils/mocks/dataMock');
const bcrypt = require('bcrypt');
const { setToken } = require('../graphql/utils/shareFunc');

module.exports = {
  show: async args => {
    let user = users.find(
      user => user.email === args.input.email.toLowerCase(),
    );
    if (!user) return null;

    let isValidPassword = await bcrypt.compare(
      args.input.password,
      user.password,
    );
    if (!isValidPassword) return null;

    const token = setToken(user._id);

    return {
      ...user,
      token,
    };
  },
};
