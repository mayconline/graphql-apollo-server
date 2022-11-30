import { server, createTestClient, gql } from '../../../mocks/serverMock';

describe('Query Test', () => {
  const { mutate } = createTestClient(server);

  it('should update refreshToken', async () => {
    const updateRefreshToken = gql`
      mutation updateRefreshToken($refreshToken: ID!) {
        updateRefreshToken(input: { refreshToken: $refreshToken }) {
          token
          refreshToken
        }
      }
    `;

    const res = await mutate({
      mutation: updateRefreshToken,
      variables: {
        refreshToken: 'token_test',
      },
    });

    expect(res.data).toHaveProperty('updateRefreshToken');
    expect(res.data.updateRefreshToken).toHaveProperty('token');
    expect(res.data.updateRefreshToken).toHaveProperty('refreshToken');
  });
});
