import { executeOperation, gql } from '../../../mocks/serverMock';

describe('Rebalance', () => {
  const REBALANCES = gql`
    query rebalances($walletID: ID!, $sort: SortRebalance!) {
      rebalances(walletID: $walletID, sort: $sort) {
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

  describe('Queries', () => {
    it('should return ticket rebalanced', async () => {
      const res = await executeOperation(REBALANCES, {
        walletID: 'a',
        sort: 'targetAmount',
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('rebalances');
      expect(bodyData.rebalances[0]).toHaveProperty('_id');
      expect(bodyData.rebalances[0]).toHaveProperty('symbol');
      expect(bodyData.rebalances[0]).toHaveProperty('longName');
      expect(bodyData.rebalances[0]).toHaveProperty('status');
      expect(bodyData.rebalances[0]).toHaveProperty('currentAmount');
      expect(bodyData.rebalances[0]).toHaveProperty('gradePercent');
      expect(bodyData.rebalances[0]).toHaveProperty('currentPercent');
      expect(bodyData.rebalances[0]).toHaveProperty('targetPercent');
      expect(bodyData.rebalances[0]).toHaveProperty('targetAmount');
      expect(bodyData.rebalances[0]).toHaveProperty('financialCurrency');
    });
  });
});
