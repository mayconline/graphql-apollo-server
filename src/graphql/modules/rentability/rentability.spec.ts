import { executeOperation, gql } from '../../../mocks/serverMock';

describe('Rentability', () => {
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

  describe('Queries', () => {
    it('should return rentability ticket ', async () => {
      const res = await executeOperation(GET_RENTABILITY, {
        walletID: 'a',
        sort: 'variationPercent',
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('getRentability');
      expect(bodyData.getRentability[0]).toHaveProperty('_id');
      expect(bodyData.getRentability[0]).toHaveProperty('symbol');
      expect(bodyData.getRentability[0]).toHaveProperty('longName');
      expect(bodyData.getRentability[0]).toHaveProperty('sumCostWallet');
      expect(bodyData.getRentability[0]).toHaveProperty('sumAmountWallet');
      expect(bodyData.getRentability[0]).toHaveProperty('costAmount');
      expect(bodyData.getRentability[0]).toHaveProperty('currentAmount');
      expect(bodyData.getRentability[0]).toHaveProperty('variationAmount');
      expect(bodyData.getRentability[0]).toHaveProperty('variationPercent');
      expect(bodyData.getRentability[0]).toHaveProperty('financialCurrency');
    });
  });
});
