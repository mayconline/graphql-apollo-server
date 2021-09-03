require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { getErrorMessage } = require('./graphql/utils/errorHandler');
const { getToken } = require('./graphql/utils/shareFunc');

const finance = require('./services/finance');

const AuthController = require('./controllers/AuthController');
const RecoveryPasswordController = require('./controllers/RecoveryPasswordController');
const UserController = require('./controllers/UserController');
const WalletController = require('./controllers/WalletController');
const TicketController = require('./controllers/TicketController');
const FinanceController = require('./controllers/FinanceController');
const QuestionController = require('./controllers/QuestionController');
const ReportsController = require('./controllers/ReportsController');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL).then(
  () => {
    console.log('Successfully connected to db');
  },
  err => {
    console.log('it was not possible to connect to the bd' + err);
  },
);

const dataSources = () => ({
  finance,
  AuthController,
  RecoveryPasswordController,
  UserController,
  WalletController,
  TicketController,
  FinanceController,
  QuestionController,
  ReportsController,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => ({
    hasToken: getToken(req),
  }),
  formatError: err => getErrorMessage(err),
});

server.listen({ port: process.env.PORT });
