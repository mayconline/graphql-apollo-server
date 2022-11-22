import { server, createTestClient, gql } from '../../../mocks/serverMock';

describe('Authenticate', () => {
  const { query, mutate } = createTestClient(server);

  it('should return array earnings', async () => {
    const getEarningByWallet = gql`
      query getEarningByWallet($walletID: ID!, $year: Int!) {
        getEarningByWallet(walletID: $walletID, year: $year) {
          _id
          year
          month
          amount
        }
      }
    `;

    const earnings = await query({
      query: getEarningByWallet,
      variables: {
        walletID: 'teste_id',
        year: 2022,
      },
    });

    expect(earnings.data).toHaveProperty('getEarningByWallet');
    expect(earnings.data.getEarningByWallet[0]).toHaveProperty('_id');
    expect(earnings.data.getEarningByWallet[0]).toHaveProperty('year');
    expect(earnings.data.getEarningByWallet[0]).toHaveProperty('month');
    expect(earnings.data.getEarningByWallet[0]).toHaveProperty('amount');
  });

  it('should return array earnings by year', async () => {
    const getEarningAccByYear = gql`
      query getEarningAccByYear($walletID: ID!) {
        getEarningAccByYear(walletID: $walletID) {
          _id
          year
          amount
        }
      }
    `;

    const earnings = await query({
      query: getEarningAccByYear,
      variables: {
        walletID: 'teste_id',
      },
    });

    expect(earnings.data).toHaveProperty('getEarningAccByYear');
    expect(earnings.data.getEarningAccByYear[0]).toHaveProperty('_id');
    expect(earnings.data.getEarningAccByYear[0]).toHaveProperty('year');
    expect(earnings.data.getEarningAccByYear[0]).toHaveProperty('amount');
  });

  it('should return sum earnings', async () => {
    const getSumEarning = gql`
      query getSumEarning($walletID: ID!, $year: Int!) {
        getSumEarning(walletID: $walletID, year: $year) {
          sumCurrentYear
          sumOldYear
          sumTotalEarnings
          yieldOnCost
        }
      }
    `;

    const earnings = await query({
      query: getSumEarning,
      variables: {
        walletID: 'teste_id',
        year: 2022,
      },
    });

    expect(earnings.data).toHaveProperty('getSumEarning');
    expect(earnings.data.getSumEarning).toHaveProperty('sumCurrentYear');
    expect(earnings.data.getSumEarning).toHaveProperty('sumOldYear');
    expect(earnings.data.getSumEarning).toHaveProperty('sumTotalEarnings');
    expect(earnings.data.getSumEarning).toHaveProperty('yieldOnCost');
  });

  it('should update earnings', async () => {
    const updateEarning = gql`
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

    const earnings = await mutate({
      mutation: updateEarning,
      variables: {
        _id: 'teste_id',
        walletID: 'teste_walletID',
        year: 2022,
        month: 12,
        amount: 20,
      },
    });

    expect(earnings.data).toHaveProperty('updateEarning');
    expect(earnings.data.updateEarning).toHaveProperty('_id');
    expect(earnings.data.updateEarning).toHaveProperty('year');
    expect(earnings.data.updateEarning).toHaveProperty('month');
    expect(earnings.data.updateEarning).toHaveProperty('amount');
  });
});
