const { ApolloServer } = require('apollo-server');

const finance = require('./services/finance');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const dataSources = () => ({
  finance,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

server.listen().then(({ url }) => console.log(`server started at ${url}`));
