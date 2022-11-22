import { server, createTestClient, gql } from '../../../mocks/serverMock';

describe('Query Test', () => {
  const { query, mutate } = createTestClient(server);

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

    const res = await query({
      query: recoveryList,
    });

    expect(res.data).toHaveProperty('recoveryList');
    expect(res.data.recoveryList[0]).toHaveProperty('_id');
    expect(res.data.recoveryList[0]).toHaveProperty('email');
    expect(res.data.recoveryList[0]).toHaveProperty('code');
  });

  it('should send recovery email', async () => {
    const sendRecovery = gql`
      mutation sendRecovery($email: String!) {
        sendRecovery(input: { email: $email })
      }
    `;

    const res = await mutate({
      mutation: sendRecovery,
      variables: {
        email: 'email test',
      },
    });

    expect(res.data).toHaveProperty('sendRecovery');
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

    const res = await mutate({
      mutation: resetPassword,
      variables: {
        email: 'email@test',
        code: '9999',
        password: 'changedPass',
      },
    });

    expect(res.data).toHaveProperty('resetPassword');
  });
});
