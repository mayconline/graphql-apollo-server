const { ApolloServer, gql } = require('apollo-server');
const { getFinance } = require('./services/finance');

//getFinance('HGLG11').then((data) => console.log(data));

const typeDefs = gql`
  type Ticket {
    _id: ID!
    symbol: String!
    quantity: Float!
    averagePrice: Float!
    grade: Int!
  }

  type Wallet {
    _id: ID!
    user: User!
    ticket: [Ticket]
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    active: Boolean!
    checkTerms: Boolean!
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
    tickets: [Ticket!]
    wallets: [Wallet]
    getWalletByUser(userID: ID!): [Wallet]
  }
`;

const users = [
  {
    _id: 1,
    email: 'teste@teste.com.br',
    password: 123,
    active: true,
    checkTerms: true,
  },
  {
    _id: 2,
    email: 'digding@dig.com.br',
    password: 123,
    active: true,
    checkTerms: true,
  },
];

const wallets = [
  {
    _id: 'a',
    user: 1,
    ticket: [1, 2, 4],
  },
  {
    _id: 'b',
    user: 2,
    ticket: [3],
  },
  {
    _id: 'c',
    user: 1,
    ticket: [2],
  },
];

const tickets = [
  {
    _id: 1,
    symbol: 'wege3.sa',
    quantity: 10,
    averagePrice: 30.2,
    grade: 10,
  },
  {
    _id: 2,
    symbol: 'itsa4.sa',
    quantity: 5,
    averagePrice: 8.2,
    grade: 10,
  },
  {
    _id: 3,
    symbol: 'itsa4.sa',
    quantity: 10,
    averagePrice: 9,
    grade: 10,
  },
  {
    _id: 4,
    symbol: 'itsa4.sa',
    quantity: 1,
    averagePrice: 9.5,
    grade: 7,
  },
];

const resolvers = {
  Wallet: {
    user: (wallets) => {
      return users.find((user) => user._id === wallets.user);
    },
    ticket: (wallets) => {
      return wallets.ticket.map((wallet) =>
        tickets.find((ticket) => ticket._id === wallet)
      );
    },
  },

  Query: {
    hello: () => 'hello word',
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email);
    },
    tickets: () => tickets,
    wallets: () => wallets,
    getWalletByUser: (_, args) => {
      return wallets.filter((wallet) => wallet.user === parseInt(args.userID));
    },
  },

  /*  Mutation: {
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
  },*/
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server started at ${url}`));
