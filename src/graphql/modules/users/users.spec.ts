import { server, createTestClient, gql } from '../../../mocks/serverMock';

describe('getUsers', () => {
  const { query } = createTestClient(server);

  const GET_USERS = gql`
    query getUsers {
      users {
        _id
        email
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

    expect(res.data).toHaveProperty('users');
  });

  it('should return one user', async () => {
    const res = await query({
      query: GET_USER_BY_TOKEN,
    });

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
        refreshToken
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

    expect(res.data).toHaveProperty('createUser');
  });
});
