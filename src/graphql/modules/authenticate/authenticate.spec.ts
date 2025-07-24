import { executeOperation, gql } from '../../../mocks/serverMock';

describe('Authenticate', () => {
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
          purchaseToken
          platform
          autoRenewing
        }
      }
    }
  `;

  const UPDATE_ROLE = gql`
    mutation updateRole($role: Role!) {
      updateRole(input: { role: $role }) {
        _id
        role
      }
    }
  `;

  describe('Queries', () => {
    it('should return authenticate user', async () => {
      const userAuth = await executeOperation(LOGIN, {
        email: 'jox@gh.com.br',
        password: '123',
      });

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
      expect(bodyData.login.plan).toHaveProperty('purchaseToken');
      expect(bodyData.login.plan).toHaveProperty('platform');
      expect(bodyData.login.plan).toHaveProperty('autoRenewing');
    });
  });

  describe('Mutations', () => {
    it('should update user role', async () => {
      const updatedRole = await executeOperation(UPDATE_ROLE, {
        role: 'USER',
      });

      const bodyData = updatedRole.body.singleResult.data;

      expect(bodyData).toHaveProperty('updateRole');
      expect(bodyData?.updateRole).toHaveProperty('_id');
      expect(bodyData?.updateRole).toHaveProperty('role');
    });
  });

  describe('Error Cases', () => {
    it('should handle invalid input at login', async () => {
      const res = await executeOperation(LOGIN, {
        invalidData: 'test',
      });

      expect(res?.body?.singleResult?.errors).toBeDefined();
      expect(res?.body?.singleResult?.errors?.[0]?.message).toContain(
        'Variable "$email" of required type "String!" was not provided.'
      );
    });

    it('should handle invalid input at update role', async () => {
      const res = await executeOperation(UPDATE_ROLE, {
        invalidData: 'test',
      });

      expect(res?.body?.singleResult?.errors).toBeDefined();
      expect(res?.body?.singleResult?.errors?.[0]?.message).toContain(
        'Variable "$role" of required type "Role!" was not provided.'
      );
    });
  });
});
