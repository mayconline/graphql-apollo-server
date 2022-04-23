const {
  server,
  createTestClient,
  gql,
} = require('../../utils/mocks/serverMock');

describe('Authenticate', () => {
  const { mutate } = createTestClient(server);

  const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
      login(input: { email: $email, password: $password }) {
        _id
        email
        token
        active
        role
      }
    }
  `;

  it('should return authenticate user', async () => {
    const userAuth = await mutate({
      query: LOGIN,
      variables: {
        email: 'jox@gh.com.br',
        password: '123',
      },
    });

    expect(userAuth.data).toHaveProperty('login');
    expect(userAuth.data.login).toHaveProperty('_id');
    expect(userAuth.data.login).toHaveProperty('email');
    expect(userAuth.data.login).toHaveProperty('token');
    expect(userAuth.data.login).toHaveProperty('active');
    expect(userAuth.data.login).toHaveProperty('role');
  });
});
