const { ApolloServer } = require('apollo-server');

const {
  getCurrentFinanceByTickets,
  getFinance,
} = require('./services/finance');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const dataSources = () => ({
  getCurrentFinanceByTickets,
  getFinance,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

server.listen().then(({ url }) => console.log(`server started at ${url}`));
