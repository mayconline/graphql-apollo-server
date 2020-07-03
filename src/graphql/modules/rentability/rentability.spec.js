const {
  server,
  createTestClient,
  gql,
} = require('../../utils/mocks/serverMock');

describe('Query Test', () => {
  const { query } = createTestClient(server);

  const GET_RENTABILITY = gql`
    query getRentability($walletID: ID!, $sort: SortRentability!) {
      getRentability(walletID: $walletID, sort: $sort) {
        _id
        symbol
        longName
        sumCostWallet
        sumAmountWallet
        costAmount
        currentAmount
        variationAmount
        variationPercent
        financialCurrency
      }
    }
  `;

  it('should return rentability ticket ', async () => {
    const res = await query({
      query: GET_RENTABILITY,
      variables: { walletID: 'a', sort: 'variationPercent' },
    });
    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('getRentability');
    expect(res.data.getRentability[0]).toHaveProperty('_id');
    expect(res.data.getRentability[0]).toHaveProperty('symbol');
    expect(res.data.getRentability[0]).toHaveProperty('longName');
    expect(res.data.getRentability[0]).toHaveProperty('sumCostWallet');
    expect(res.data.getRentability[0]).toHaveProperty('sumAmountWallet');
    expect(res.data.getRentability[0]).toHaveProperty('costAmount');
    expect(res.data.getRentability[0]).toHaveProperty('currentAmount');
    expect(res.data.getRentability[0]).toHaveProperty('variationAmount');
    expect(res.data.getRentability[0]).toHaveProperty('variationPercent');
    expect(res.data.getRentability[0]).toHaveProperty('financialCurrency');
  });
});
