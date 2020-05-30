const { makeExecutableSchema, mockServer } = require('graphql-tools');

const typeDefs = require('../../typeDefs');
const resolvers = require('../../resolvers');

describe('getUsers', () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const { query } = mockServer(schema);

  const getUsers = `
    query{
      users{
        _id
        email
        password
        active
        checkTerms
      }
    }
`;

  it('should return users array', async () => {
    const res = await query(getUsers);
    expect(res).toMatchSnapshot();
  });
});
