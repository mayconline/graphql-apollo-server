import { server, createTestClient, gql } from '../../../mocks/serverMock';

describe('Authenticate', () => {
  const { mutate } = createTestClient(server);

  const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
      login(input: { email: $email, password: $password }) {
        _id
        email
        token
        refreshToken
        active
        role
        plan {
          transactionDate
          renewDate
          description
          localizedPrice
          productId
          subscriptionPeriodAndroid
          packageName
          transactionId
        }
      }
    }
  `;

  it('should return authenticate user', async () => {
    const userAuth = await mutate({
      mutation: LOGIN,
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
    expect(userAuth.data.login).toHaveProperty('refreshToken');
    expect(userAuth.data.login).toHaveProperty('plan');
    expect(userAuth.data.login.plan).toHaveProperty('transactionDate');
    expect(userAuth.data.login.plan).toHaveProperty('renewDate');
    expect(userAuth.data.login.plan).toHaveProperty('description');
    expect(userAuth.data.login.plan).toHaveProperty('localizedPrice');
    expect(userAuth.data.login.plan).toHaveProperty('productId');
    expect(userAuth.data.login.plan).toHaveProperty(
      'subscriptionPeriodAndroid',
    );
    expect(userAuth.data.login.plan).toHaveProperty('packageName');
    expect(userAuth.data.login.plan).toHaveProperty('transactionId');
  });
});
