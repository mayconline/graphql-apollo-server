const { users } = require('../graphql/utils/mocks/dataMock');

module.exports = {
  index: () => users,
  show: args => {
    return users.find(user => user.email === args.email);
  },
  store: args => {
    let newUser = {
      _id: String(Math.random()),
      email: args.input.email,
      password: args.input.password,
      active: args.input.active,
      checkTerms: args.input.checkTerms,
    };

    users.push(newUser);
    return newUser;
  },
  update: args => {
    let user = users.find(user => user._id === args._id);
    if (!user) return null;

    user = {
      ...user,
      email: args.input.email,
      password: args.input.password,
      active: args.input.active,
      checkTerms: args.input.checkTerms,
    };

    users.splice(users.indexOf(user), 1, user);

    return user;
  },
  destroy: args => {
    let user = users.find(user => user._id === args._id);
    if (user) users.splice(users.indexOf(user), 1);
    return !!user;
  },
};
