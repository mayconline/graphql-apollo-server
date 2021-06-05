const {
  server,
  createTestClient,
  gql,
} = require('../../utils/mocks/serverMock');

describe('Query Test', () => {
  const { query } = createTestClient(server);

  const GET_REPORTS_BY_TYPE = gql`
    query getReportsByType($walletID: ID!, $type: Type!) {
      getReportsByType(walletID: $walletID, type: $type) {
        _id
        key
        value
        color
      }
    }
  `;

  it('should return reports by class', async () => {
    const res = await query({
      query: GET_REPORTS_BY_TYPE,
      variables: { walletID: 'a', type: 'CLASS' },
    });
    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('getReportsByType');
    expect(res.data.getReportsByType).toHaveProperty('_id');
    expect(res.data.getReportsByType).toHaveProperty('key');
    expect(res.data.getReportsByType).toHaveProperty('value');
    expect(res.data.getReportsByType).toHaveProperty('color');
  });
});
