const { loadFilesSync, mergeTypeDefs } = require('graphql-tools');
const path = require('path');

const typesArray = loadFilesSync(
  path.join(__dirname, 'modules', '**', '*.gql')
);

const typeDefs = mergeTypeDefs(typesArray);

module.exports = typeDefs;
