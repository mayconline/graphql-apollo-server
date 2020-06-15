const { ApolloServer, gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');

const typeDefs = require('../typeDefs');
const resolvers = require('../resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: true,
  mockEntireSchema: false,
});

module.exports = {
  server,
  createTestClient,
  gql,
};
