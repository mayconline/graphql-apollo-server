import { mockApolloServer, gql, dataSources } from '../../../mocks/serverMock';
import { SingleGraphQLResponse } from '../../../mocks/type';

describe('Authenticate', () => {
  const server = mockApolloServer;

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
    const userAuth = (await server.executeOperation(
      {
        query: LOGIN,
        variables: {
          email: 'jox@gh.com.br',
          password: '123',
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    const bodyData = userAuth.body.singleResult.data;

    expect(bodyData).toHaveProperty('login');
    expect(bodyData.login).toHaveProperty('_id');
    expect(bodyData.login).toHaveProperty('email');
    expect(bodyData.login).toHaveProperty('token');
    expect(bodyData.login).toHaveProperty('active');
    expect(bodyData.login).toHaveProperty('role');
    expect(bodyData.login).toHaveProperty('refreshToken');
    expect(bodyData.login).toHaveProperty('plan');
    expect(bodyData.login.plan).toHaveProperty('transactionDate');
    expect(bodyData.login.plan).toHaveProperty('renewDate');
    expect(bodyData.login.plan).toHaveProperty('description');
    expect(bodyData.login.plan).toHaveProperty('localizedPrice');
    expect(bodyData.login.plan).toHaveProperty('productId');
    expect(bodyData.login.plan).toHaveProperty('subscriptionPeriodAndroid');
    expect(bodyData.login.plan).toHaveProperty('packageName');
    expect(bodyData.login.plan).toHaveProperty('transactionId');
  });
});
