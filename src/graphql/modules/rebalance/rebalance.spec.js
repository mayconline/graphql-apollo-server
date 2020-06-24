const { server, createTestClient, gql } = require('../../utils/serverMock');

describe('Query Test', () => {
  const { query } = createTestClient(server);

  const REBALANCES = gql`
    query rebalances($walletID: ID!) {
      rebalances(walletID: $walletID) {
        _id
        symbol
        longName
        status
        currentAmount
        gradePercent
        currentPercent
        targetPercent
        targetAmount
        financialCurrency
      }
    }
  `;

  it('should return ticket rebalanced', async () => {
    const res = await query({
      query: REBALANCES,
      variables: { walletID: 'a' },
    });
    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('rebalances');
    expect(res.data.rebalances[0]).toHaveProperty('_id');
    expect(res.data.rebalances[0]).toHaveProperty('symbol');
    expect(res.data.rebalances[0]).toHaveProperty('longName');
    expect(res.data.rebalances[0]).toHaveProperty('status');
    expect(res.data.rebalances[0]).toHaveProperty('currentAmount');
    expect(res.data.rebalances[0]).toHaveProperty('gradePercent');
    expect(res.data.rebalances[0]).toHaveProperty('currentPercent');
    expect(res.data.rebalances[0]).toHaveProperty('targetPercent');
    expect(res.data.rebalances[0]).toHaveProperty('targetAmount');
    expect(res.data.rebalances[0]).toHaveProperty('financialCurrency');
  });
});
