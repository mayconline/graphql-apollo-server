import { executeOperation, gql } from '../../../mocks/serverMock';

describe('RefreshToken', () => {
  const UPDATE_REFRESH_TOKEN = gql`
    mutation updateRefreshToken($refreshToken: String!) {
      updateRefreshToken(input: { refreshToken: $refreshToken }) {
        token
        refreshToken
      }
    }
  `;

  describe('Queries', () => {
    it('should update refreshToken', async () => {
      const res = await executeOperation(UPDATE_REFRESH_TOKEN, {
        refreshToken: 'token_test',
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('updateRefreshToken');
      expect(bodyData.updateRefreshToken).toHaveProperty('token');
      expect(bodyData.updateRefreshToken).toHaveProperty('refreshToken');
    });
  });
});
