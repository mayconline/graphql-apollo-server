const { users } = require('../graphql/utils/mocks/dataMock');
const bcrypt = require('bcrypt');
const { setToken } = require('../graphql/utils/shareFunc');

module.exports = {
  index: hasToken => {
    if (hasToken.role !== 'ADM') throw new Error('User Unauthorized');
    return users;
  },
  show: hasToken => {
    return users.find(user => user._id === hasToken._id);
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
      role: args.input.role,
    };

    const token = setToken(newUser._id, newUser.role);

    users.push(newUser);
    return { ...newUser, token };
  },
  update: async (args, hasToken) => {
    let user = users.find(user => user._id === hasToken._id);
    if (!user) throw new Error('User Not Exists');

    let updateUser = {
      ...user,
      email: args.input.email.toLowerCase(),
      password: await bcrypt.hash(args.input.password, 10),
      active: args.input.active,
      checkTerms: args.input.checkTerms,
      role: args.input.role,
    };

    const token = setToken(user._id, user.role);

    users.splice(users.indexOf(user), 1, updateUser);

    return { ...user, token };
  },
  destroy: hasToken => {
    let user = users.find(user => user._id === hasToken._id);
    if (!user) throw new Error('User Not Exists');

    users.splice(users.indexOf(user), 1);
    return !!user;
  },
};
