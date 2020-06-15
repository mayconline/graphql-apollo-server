const { server, createTestClient, gql } = require('../../utils/serverMock');

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

  const GET_USER_BY_EMAIL = gql`
    query getUserByEmail($email: String!) {
      getUserByEmail(email: $email) {
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
      query: GET_USER_BY_EMAIL,
      variables: { email: 'teste@te.com' },
    });
    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('getUserByEmail');
  });

  it('should have one _id', async () => {
    const res = await query({
      query: GET_USER_BY_EMAIL,
      variables: { email: 'digding@dig.com.br' },
    });
    expect(res.data.getUserByEmail).toHaveProperty('_id');
  });
});

describe('create User', () => {
  const { mutate } = createTestClient(server);

  const CREATE_USER = gql`
    mutation createUser(
      $email: String!
      $password: String!
      $active: Boolean!
      $checkTerms: Boolean!
    ) {
      createUser(
        input: {
          email: $email
          password: $password
          active: $active
          checkTerms: $checkTerms
        }
      ) {
        _id
        email
        active
        checkTerms
      }
    }
  `;

  it('should create user', async () => {
    const res = await mutate({
      mutation: CREATE_USER,
      variables: {
        email: 'te@te.com.br',
        password: '123',
        active: true,
        checkTerms: true,
      },
    });

    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('createUser');
  });
});
