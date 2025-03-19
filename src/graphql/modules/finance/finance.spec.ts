import { gql, executeOperation } from '../../../mocks/serverMock';

describe('Finance', () => {
  const GET_API_FINANCE = gql`
    query getApiFinance($symbol: String) {
      getApiFinance(symbol: $symbol) {
        regularMarketPrice
        financialCurrency
        longName
        sector
        industry
      }
    }
  `;

  describe('Queries', () => {
    it('should return ticket details', async () => {
      const res = await executeOperation(GET_API_FINANCE, {
        symbol: 'mglu3.sa',
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('getApiFinance');
      expect(bodyData.getApiFinance).toHaveProperty('regularMarketPrice');
      expect(bodyData.getApiFinance).toHaveProperty('financialCurrency');
      expect(bodyData.getApiFinance).toHaveProperty('longName');
      expect(bodyData.getApiFinance).toHaveProperty('sector');
      expect(bodyData.getApiFinance).toHaveProperty('industry');
    });
  });
});
