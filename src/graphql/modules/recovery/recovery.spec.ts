import { executeOperation, gql } from '../../../mocks/serverMock';

describe('Recovery', () => {
  const RECOVERY_LIST = gql`
    query recoveryList {
      recoveryList {
        _id
        email
        code
      }
    }
  `;

  const SEND_RECOVERY = gql`
    mutation sendRecovery($email: String!) {
      sendRecovery(input: { email: $email })
    }
  `;

  const RESET_PASSWORD = gql`
    mutation resetPassword(
      $email: String!
      $code: String!
      $password: String!
    ) {
      resetPassword(input: { email: $email, code: $code, password: $password })
    }
  `;

  describe('Queries', () => {
    it('should return recovery list', async () => {
      const res = await executeOperation(RECOVERY_LIST);

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('recoveryList');
      expect(bodyData.recoveryList[0]).toHaveProperty('_id');
      expect(bodyData.recoveryList[0]).toHaveProperty('email');
      expect(bodyData.recoveryList[0]).toHaveProperty('code');
    });
  });

  describe('Mutations', () => {
    it('should send recovery email', async () => {
      const res = await executeOperation(SEND_RECOVERY, {
        email: 'email@test',
      });

      expect(res.body.singleResult.data).toHaveProperty('sendRecovery');
    });

    it('should reset password', async () => {
      const res = await executeOperation(RESET_PASSWORD, {
        email: 'email@test',
        code: '9999',
        password: 'changedPass',
      });

      expect(res.body.singleResult.data).toHaveProperty('resetPassword');
    });
  });
});
