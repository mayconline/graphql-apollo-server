const {
  server,
  createTestClient,
  gql,
} = require('../../utils/mocks/serverMock');

describe('Query Test', () => {
  const { query } = createTestClient(server);

  const GET_API_FINANCE = gql`
    query getApiFinance($symbol: String) {
      getApiFinance(symbol: $symbol) {
        regularMarketPrice
        financialCurrency
        exchange
        market
        longName
        symbol
      }
    }
  `;

  it('should return ticket details', async () => {
    const res = await query({
      query: GET_API_FINANCE,
      variables: { symbol: 'mglu3.sa' },
    });
    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('getApiFinance');
    expect(res.data.getApiFinance).toHaveProperty('regularMarketPrice');
    expect(res.data.getApiFinance).toHaveProperty('financialCurrency');
    expect(res.data.getApiFinance).toHaveProperty('exchange');
    expect(res.data.getApiFinance).toHaveProperty('market');
    expect(res.data.getApiFinance).toHaveProperty('longName');
    expect(res.data.getApiFinance).toHaveProperty('symbol');
  });
});
