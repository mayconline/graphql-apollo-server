import { mockApolloServer, gql, dataSources } from '../../../mocks/serverMock';
import { SingleGraphQLResponse } from '../../../mocks/type';

const server = mockApolloServer;

describe('getUsers', () => {
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
    const res = (await server.executeOperation(
      { query: GET_USERS },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    expect(res.body.singleResult.data).toHaveProperty('users');
  });

  it('should return one user', async () => {
    const res = (await server.executeOperation(
      {
        query: GET_USER_BY_TOKEN,
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    expect(res.body.singleResult.data).toHaveProperty('getUserByToken');
  });
});

describe('create User', () => {
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
    const res = (await server.executeOperation(
      {
        query: CREATE_USER,
        variables: {
          email: 'te@te.com.br',
          password: '123',
          checkTerms: true,
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    expect(res.body.singleResult.data).toHaveProperty('createUser');
  });
});
