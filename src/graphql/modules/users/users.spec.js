const { makeExecutableSchema, mockServer } = require('graphql-tools');

const typeDefs = require('../../typeDefs');
const resolvers = require('../../resolvers');

describe('getUsers', () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  preserveResolvers = true;
  const { query } = mockServer(schema, {}, preserveResolvers);

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

  const getUserByEmail = `
    query{
      getUserByEmail(email:"digding@dig.com.br"){
        _id
        email
      }
    }
`;

  it('should return users array', async () => {
    const res = await query(getUsers);
    expect(res).toMatchSnapshot();
  });

  it('should return one user', async () => {
    const res = await query(getUserByEmail);
    expect(res).toMatchSnapshot();
  });

  it('should return data.getUserByEmail', async () => {
    const res = await query(getUserByEmail);
    expect(res).toEqual({
      data: {
        getUserByEmail: {
          _id: '2',
          email: 'digding@dig.com.br',
        },
      },
    });
  });
});
