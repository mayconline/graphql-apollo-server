import { mockApolloServer, gql, dataSources } from '../../../mocks/serverMock';
import { SingleGraphQLResponse } from '../../../mocks/type';

describe('Query Test', () => {
  const server = mockApolloServer;

  it('should update refreshToken', async () => {
    const updateRefreshToken = gql`
      mutation updateRefreshToken($refreshToken: String!) {
        updateRefreshToken(input: { refreshToken: $refreshToken }) {
          token
          refreshToken
        }
      }
    `;

    const res = (await server.executeOperation(
      {
        query: updateRefreshToken,
        variables: {
          refreshToken: 'token_test',
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    const bodyData = res.body.singleResult.data;

    expect(bodyData).toHaveProperty('updateRefreshToken');
    expect(bodyData.updateRefreshToken).toHaveProperty('token');
    expect(bodyData.updateRefreshToken).toHaveProperty('refreshToken');
  });
});
