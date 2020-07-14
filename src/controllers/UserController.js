const { users } = require('../graphql/utils/mocks/dataMock');
const bcrypt = require('bcrypt');
const { setToken } = require('../graphql/utils/shareFunc');

module.exports = {
  index: () => users,
  show: args => {
    return users.find(user => user.email === args.email.toLowerCase());
  },
  store: async args => {
    let user = users.find(
      user => user.email === args.input.email.toLowerCase(),
    );
    if (user) throw new Error('User Exists');

    let newUser = {
      _id: String(Math.random()),
      email: args.input.email.toLowerCase(),
      password: await bcrypt.hash(args.input.password, 10),
      active: args.input.active,
      checkTerms: args.input.checkTerms,
    };

    const token = setToken(newUser._id);

    users.push(newUser);
    return { ...newUser, token };
  },
  update: async args => {
    let user = users.find(user => user._id === args._id);
    if (!user) throw new Error('User Not Exists');

    user = {
      ...user,
      email: args.input.email.toLowerCase(),
      password: await bcrypt.hash(args.input.password, 10),
      active: args.input.active,
      checkTerms: args.input.checkTerms,
    };

    const token = setToken(user._id);

    users.splice(users.indexOf(user), 1, user);

    return { ...user, token };
  },
  destroy: args => {
    let user = users.find(user => user._id === args._id);
    if (!user) throw new Error('User Not Exists');

    users.splice(users.indexOf(user), 1);
    return !!user;
  },
};