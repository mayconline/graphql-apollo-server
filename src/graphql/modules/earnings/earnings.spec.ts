import { gql, executeOperation } from '../../../mocks/serverMock';

describe('Authenticate', () => {
  const GET_EARNING_BY_WALLET = gql`
    query getEarningByWallet($walletID: ID!, $year: Int!) {
      getEarningByWallet(walletID: $walletID, year: $year) {
        _id
        year
        month
        amount
      }
    }
  `;

  const GET_EARNING_ACC_BY_YEAR = gql`
    query getEarningAccByYear($walletID: ID!) {
      getEarningAccByYear(walletID: $walletID) {
        _id
        year
        amount
      }
    }
  `;

  const GET_SUM_EARNING = gql`
    query getSumEarning($walletID: ID!, $year: Int!) {
      getSumEarning(walletID: $walletID, year: $year) {
        sumCurrentYear
        sumOldYear
        sumTotalEarnings
        yieldOnCost
      }
    }
  `;

  const UPDATE_EARNING = gql`
    mutation updateEarning(
      $_id: ID
      $walletID: ID!
      $year: Int!
      $month: Int!
      $amount: Float!
    ) {
      updateEarning(
        _id: $_id
        walletID: $walletID
        input: { year: $year, month: $month, amount: $amount }
      ) {
        _id
        year
        month
        amount
      }
    }
  `;

  describe('Queries', () => {
    it('should return array earnings', async () => {
      const earnings = await executeOperation(GET_EARNING_BY_WALLET, {
        walletID: 'test_id',
        year: 2022,
      });

      const bodyData = earnings.body.singleResult.data;

      expect(bodyData).toHaveProperty('getEarningByWallet');
      expect(bodyData.getEarningByWallet[0]).toHaveProperty('_id');
      expect(bodyData.getEarningByWallet[0]).toHaveProperty('year');
      expect(bodyData.getEarningByWallet[0]).toHaveProperty('month');
      expect(bodyData.getEarningByWallet[0]).toHaveProperty('amount');
    });

    it('should return array earnings by year', async () => {
      const earnings = await executeOperation(GET_EARNING_ACC_BY_YEAR, {
        walletID: 'test_id',
      });

      const bodyData = earnings.body.singleResult.data;

      expect(bodyData).toHaveProperty('getEarningAccByYear');
      expect(bodyData.getEarningAccByYear[0]).toHaveProperty('_id');
      expect(bodyData.getEarningAccByYear[0]).toHaveProperty('year');
      expect(bodyData.getEarningAccByYear[0]).toHaveProperty('amount');
    });

    it('should return sum earnings', async () => {
      const earnings = await executeOperation(GET_SUM_EARNING, {
        walletID: 'test_id',
        year: 2022,
      });

      const bodyData = earnings.body.singleResult.data;

      expect(bodyData).toHaveProperty('getSumEarning');
      expect(bodyData.getSumEarning).toHaveProperty('sumCurrentYear');
      expect(bodyData.getSumEarning).toHaveProperty('sumOldYear');
      expect(bodyData.getSumEarning).toHaveProperty('sumTotalEarnings');
      expect(bodyData.getSumEarning).toHaveProperty('yieldOnCost');
    });
  });

  describe('Mutations', () => {
    it('should update earnings', async () => {
      const earnings = await executeOperation(UPDATE_EARNING, {
        _id: 'test_id',
        walletID: 'test_id',
        year: 2022,
        month: 1,
        amount: 100,
      });

      const bodyData = earnings.body.singleResult.data;

      expect(bodyData).toHaveProperty('updateEarning');
      expect(bodyData.updateEarning).toHaveProperty('_id');
      expect(bodyData.updateEarning).toHaveProperty('year');
      expect(bodyData.updateEarning).toHaveProperty('month');
      expect(bodyData.updateEarning).toHaveProperty('amount');
    });
  });
});
