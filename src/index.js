const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const users = [
  {
    _id: String(Math.random()),
    name: 'Maycon',
    email: 'mayconline.ti@gmail.com',
    active: true,
  },
  {
    _id: String(Math.random()),
    name: 'Joao',
    email: 'joaozinho@gmail.com',
    active: true,
  },
  {
    _id: String(Math.random()),
    name: 'Pedro',
    email: 'pedrao@gmail.com',
    active: true,
  },
];

const resolvers = {
  Query: {
    hello: () => 'hello word',
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email);
    },
  },

  Mutation: {
    createUser: (_, args) => {
      let newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true,
      };

      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server started at ${url}`));
