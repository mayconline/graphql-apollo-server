const { ApolloServer } = require('apollo-server');

const finance = require('./services/finance');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const WalletController = require('./controllers/WalletController');
const TicketController = require('./controllers/TicketController');
const FinanceController = require('./controllers/FinanceController');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const dataSources = () => ({
  finance,
  AuthController,
  UserController,
  WalletController,
  TicketController,
  FinanceController,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

server.listen().then(({ url }) => console.log(`server started at ${url}`));
