const { users } = require('../../../mocks');

module.exports = {
  Query: {
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find(user => user.email === args.email);
    },
  },

  Mutation: {
    createUser: (_, args) => {
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
    updateUser: (_, args) => {
      let user = users.find(user => user._id === parseInt(args._id));
      if (user) users.splice(users.indexOf(user), 1);

      user = {
        ...user,
        email: args.input.email,
        password: args.input.password,
        active: args.input.active,
        checkTerms: args.input.checkTerms,
      };

      users.push(user);

      return user;
    },
    deleteUser: (_, args) => {
      let user = users.find(user => user._id === parseInt(args._id));
      if (user) users.splice(users.indexOf(user), 1);
      return !!user;
    },
  },
};
