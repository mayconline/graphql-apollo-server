import { mockApolloServer, gql, dataSources } from '../../../mocks/serverMock';
import { SingleGraphQLResponse } from '../../../mocks/type';

describe('Query Test', () => {
  const server = mockApolloServer;

  it('should return recovery list', async () => {
    const recoveryList = gql`
      query recoveryList {
        recoveryList {
          _id
          email
          code
        }
      }
    `;

    const res = (await server.executeOperation(
      {
        query: recoveryList,
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    const bodyData = res.body.singleResult.data;

    expect(bodyData).toHaveProperty('recoveryList');
    expect(bodyData.recoveryList[0]).toHaveProperty('_id');
    expect(bodyData.recoveryList[0]).toHaveProperty('email');
    expect(bodyData.recoveryList[0]).toHaveProperty('code');
  });

  it('should send recovery email', async () => {
    const sendRecovery = gql`
      mutation sendRecovery($email: String!) {
        sendRecovery(input: { email: $email })
      }
    `;

    const res = (await server.executeOperation(
      {
        query: sendRecovery,
        variables: {
          email: 'email test',
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    expect(res.body.singleResult.data).toHaveProperty('sendRecovery');
  });

  it('should reset password', async () => {
    const resetPassword = gql`
      mutation resetPassword(
        $email: String!
        $code: String!
        $password: String!
      ) {
        resetPassword(
          input: { email: $email, code: $code, password: $password }
        )
      }
    `;

    const res = (await server.executeOperation(
      {
        query: resetPassword,
        variables: {
          email: 'email@test',
          code: '9999',
          password: 'changedPass',
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    expect(res.body.singleResult.data).toHaveProperty('resetPassword');
  });
});
