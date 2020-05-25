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
    posts: [Post!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const users = [
  {
    _id: '1',
    name: 'Maycon',
    email: 'mayconline.ti@gmail.com',
    active: true,
  },
  {
    _id: '2',
    name: 'Joao',
    email: 'joaozinho@gmail.com',
    active: true,
  },
  {
    _id: '3',
    name: 'Pedro',
    email: 'pedrao@gmail.com',
    active: true,
  },
];

const posts = [
  {
    _id: String(Math.random()),
    title: 'A Aventura nordica',
    content: 'blablablalablbalbalblalba',
    author: '1',
  },
  {
    _id: String(Math.random()),
    title: 'A Aventura nordica 2',
    content: 'blablablalablbalbalblalba',
    author: '1',
  },
  {
    _id: String(Math.random()),
    title: 'A Aventura nordica 3',
    content: 'blablablalablbalbalblalba',
    author: '3',
  },
];

const resolvers = {
  Post: {
    author: (posts) => {
      return users.find((user) => user._id === posts.author);
    },
  },

  Query: {
    hello: () => 'hello word',
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email);
    },
    posts: () => posts,
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
