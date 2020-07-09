const { ApolloServer } = require('apollo-server');
const { getErrorMessage } = require('./graphql/utils/errorHandler');
const { getToken } = require('./graphql/utils/shareFunc');

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
  context: ({ req }) => {
    const isValidToken = getToken(req);
    return { isValidToken };
  },
  formatError: err => getErrorMessage(err),
});

server.listen().then(({ url }) => console.log(`server started at ${url}`));
