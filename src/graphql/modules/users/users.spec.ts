import { gql, executeOperation } from '../../../mocks/serverMock';

describe('Users', () => {
  const GET_USERS = gql`
    query getUsers {
      users {
        _id
        email
        active
        checkTerms
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

  const GET_USER_BY_TOKEN = gql`
    query getUserByToken {
      getUserByToken {
        _id
        email
        role
        checkTerms
        active
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
        token
        refreshToken
        role
      }
    }
  `;

  const UPDATE_USER = gql`
    mutation updateUser($input: UserUpdateInput!) {
      updateUser(input: $input) {
        _id
        email
        active
        checkTerms
        role
      }
    }
  `;

  const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
      deleteUser(_id: $id)
    }
  `;

  describe('Queries', () => {
    it('should return users array', async () => {
      const res = await executeOperation(GET_USERS);

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('users');
      expect(bodyData.users).toBeInstanceOf(Array);
      expect(bodyData.users[0]).toHaveProperty('_id');
      expect(bodyData.users[0]).toHaveProperty('email');
      expect(bodyData.users[0]).toHaveProperty('active');
      expect(bodyData.users[0]).toHaveProperty('checkTerms');
      expect(bodyData.users[0]).toHaveProperty('role');
      expect(bodyData.users[0]).toHaveProperty('plan');
      expect(bodyData.users[0].plan).toHaveProperty('transactionDate');
      expect(bodyData.users[0].plan).toHaveProperty('renewDate');
      expect(bodyData.users[0].plan).toHaveProperty('description');
      expect(bodyData.users[0].plan).toHaveProperty('localizedPrice');
      expect(bodyData.users[0].plan).toHaveProperty('productId');
      expect(bodyData.users[0].plan).toHaveProperty(
        'subscriptionPeriodAndroid',
      );
      expect(bodyData.users[0].plan).toHaveProperty('packageName');
      expect(bodyData.users[0].plan).toHaveProperty('transactionId');

      expect(bodyData.users[0].plan).toHaveProperty(
        'subscriptionPeriodAndroid',
      );
      expect(bodyData.users[0].plan).toHaveProperty('packageName');
      expect(bodyData.users[0].plan).toHaveProperty('transactionId');
    });

    it('should return one user', async () => {
      const res = await executeOperation(GET_USER_BY_TOKEN);

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('getUserByToken');
      expect(bodyData.getUserByToken).toHaveProperty('_id');
      expect(bodyData.getUserByToken).toHaveProperty('email');
      expect(bodyData.getUserByToken).toHaveProperty('role');
      expect(bodyData.getUserByToken).toHaveProperty('checkTerms');
      expect(bodyData.getUserByToken).toHaveProperty('active');
      expect(bodyData.getUserByToken).toHaveProperty('plan');
      expect(bodyData.getUserByToken.plan).toHaveProperty('transactionDate');
      expect(bodyData.getUserByToken.plan).toHaveProperty('renewDate');
      expect(bodyData.getUserByToken.plan).toHaveProperty('description');
      expect(bodyData.getUserByToken.plan).toHaveProperty('localizedPrice');
      expect(bodyData.getUserByToken.plan).toHaveProperty('productId');
      expect(bodyData.getUserByToken.plan).toHaveProperty(
        'subscriptionPeriodAndroid',
      );
    });
  });

  describe('Mutations', () => {
    it('should create user', async () => {
      const res = await executeOperation(CREATE_USER, {
        email: 'te@te.com.br',
        password: '123',
        checkTerms: true,
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('createUser');
      expect(bodyData.createUser).toHaveProperty('_id');
      expect(bodyData.createUser).toHaveProperty('email');
      expect(bodyData.createUser).toHaveProperty('active');
      expect(bodyData.createUser).toHaveProperty('checkTerms');
      expect(bodyData.createUser).toHaveProperty('token');
      expect(bodyData.createUser).toHaveProperty('refreshToken');
      expect(bodyData.createUser).toHaveProperty('role');
    });

    it('should update user', async () => {
      const res = await executeOperation(UPDATE_USER, {
        id: '1',
        input: { active: true },
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('updateUser');
      expect(bodyData.updateUser).toHaveProperty('_id');
      expect(bodyData.updateUser).toHaveProperty('email');
      expect(bodyData.updateUser).toHaveProperty('active');
      expect(bodyData.updateUser).toHaveProperty('checkTerms');
      expect(bodyData.updateUser).toHaveProperty('role');
    });

    it('should delete user', async () => {
      const res = await executeOperation(DELETE_USER, {
        id: '1',
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('deleteUser');
    });
  });
});
