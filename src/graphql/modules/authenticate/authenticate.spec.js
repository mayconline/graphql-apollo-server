const {
  server,
  createTestClient,
  gql,
} = require('../../utils/mocks/serverMock');

describe('Authenticate', () => {
  const { query, mutate } = createTestClient(server);

  const LOGIN = gql`
    query login($email: String!, $password: String!) {
      login(input: { email: $email, password: $password }) {
        _id
        email
        token
      }
    }
  `;

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
        password
      }
    }
  `;

  it('should return authenticate user', async () => {
    const user = await mutate({
      mutation: CREATE_USER,
      variables: {
        email: 'jox@gh.com.br',
        password: '123',
        active: true,
        checkTerms: true,
      },
    });

    const userAuth = await query({
      query: LOGIN,
      variables: {
        email: 'jox@gh.com.br',
        password: '123',
      },
    });

    expect(userAuth).toMatchSnapshot();
    expect(userAuth.data).toHaveProperty('login');
    expect(userAuth.data.login).toHaveProperty('token');
  });
});
