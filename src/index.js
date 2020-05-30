const { ApolloServer, gql } = require('apollo-server');
const { getFinance } = require('./services/finance');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

//getFinance('HGLG11').then((data) => console.log(data));

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server started at ${url}`));
