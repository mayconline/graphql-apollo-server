import { server, createTestClient, gql } from '../../utils/mocks/serverMock';

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

    expect(res.data).toHaveProperty('getReportsByType');
    expect(res.data.getReportsByType[0]).toHaveProperty('_id');
    expect(res.data.getReportsByType[0]).toHaveProperty('key');
    expect(res.data.getReportsByType[0]).toHaveProperty('value');
    expect(res.data.getReportsByType[0]).toHaveProperty('color');
  });

  it('should return reports by ticket', async () => {
    const res = await query({
      query: GET_REPORTS_BY_TYPE,
      variables: { walletID: 'a', type: 'TICKET' },
    });

    expect(res.data).toHaveProperty('getReportsByType');
    expect(res.data.getReportsByType[0]).toHaveProperty('_id');
    expect(res.data.getReportsByType[0]).toHaveProperty('key');
    expect(res.data.getReportsByType[0]).toHaveProperty('value');
    expect(res.data.getReportsByType[0]).toHaveProperty('color');
  });

  it('should return reports by sector', async () => {
    const res = await query({
      query: GET_REPORTS_BY_TYPE,
      variables: { walletID: 'a', type: 'SECTOR' },
    });

    expect(res.data).toHaveProperty('getReportsByType');
    expect(res.data.getReportsByType[0]).toHaveProperty('_id');
    expect(res.data.getReportsByType[0]).toHaveProperty('key');
    expect(res.data.getReportsByType[0]).toHaveProperty('value');
    expect(res.data.getReportsByType[0]).toHaveProperty('color');
  });

  it('should return reports by industry', async () => {
    const res = await query({
      query: GET_REPORTS_BY_TYPE,
      variables: { walletID: 'a', type: 'INDUSTRY' },
    });

    expect(res.data).toHaveProperty('getReportsByType');
    expect(res.data.getReportsByType[0]).toHaveProperty('_id');
    expect(res.data.getReportsByType[0]).toHaveProperty('key');
    expect(res.data.getReportsByType[0]).toHaveProperty('value');
    expect(res.data.getReportsByType[0]).toHaveProperty('color');
  });

  it('should return error if not exist enum', async () => {
    const res = await query({
      query: GET_REPORTS_BY_TYPE,
      variables: { walletID: 'a', type: 'NOT_EXIST' },
    });

    expect(res.errors[0].message).toBe(
      'Variable "$type" got invalid value "NOT_EXIST"; Value "NOT_EXIST" does not exist in "Type" enum.',
    );
  });
});
