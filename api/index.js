require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { getErrorMessage } = require('../src/graphql/utils/errorHandler');
const { getToken } = require('../src/graphql/utils/shareFunc');

const finance = require('../src/services/finance');

const AuthController = require('../src/controllers/AuthController');
const RecoveryPasswordController = require('../src/controllers/RecoveryPasswordController');
const UserController = require('../src/controllers/UserController');
const WalletController = require('../src/controllers/WalletController');
const TicketController = require('../src/controllers/TicketController');
const FinanceController = require('../src/controllers/FinanceController');
const QuestionController = require('../src/controllers/QuestionController');
const ReportsController = require('../src/controllers/ReportsController');
const EarningController = require('../src/controllers/EarningController');

const typeDefs = require('../src/graphql/typeDefs');
const resolvers = require('../src/graphql/resolvers');

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
  EarningController,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => ({
    hasToken: getToken(req),
  }),
  formatError: err => getErrorMessage(err),
  cache: 'bounded',
});

server.listen({ port: process.env.PORT });
