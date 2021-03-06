const {
  server,
  createTestClient,
  gql,
} = require('../../utils/mocks/serverMock');

describe('getUsers', () => {
  const { query } = createTestClient(server);

  const GET_USERS = gql`
    query getUsers {
      users {
        _id
        email
        password
        active
        checkTerms
      }
    }
  `;

  const GET_USER_BY_TOKEN = gql`
    query getUserByToken {
      getUserByToken {
        _id
        email
      }
    }
  `;

  it('should return users array', async () => {
    const res = await query({ query: GET_USERS });
    expect(res).toMatchSnapshot();
  });

  it('should return one user', async () => {
    const res = await query({
      query: GET_USER_BY_TOKEN,
    });
    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('getUserByToken');
  });
});

describe('create User', () => {
  const { mutate } = createTestClient(server);

  const CREATE_USER = gql`
    mutation createUser(
      $email: String!
      $password: String!
      $checkTerms: Boolean!
    ) {
      createUser(
        input: { email: $email, password: $password, checkTerms: $checkTerms }
      ) {
        _id
        email
        active
        checkTerms
        password
        token
        role
      }
    }
  `;

  it('should create user', async () => {
    const res = await mutate({
      mutation: CREATE_USER,
      variables: {
        email: 'te@te.com.br',
        password: '123',
        checkTerms: true,
      },
    });

    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('createUser');
  });
});
