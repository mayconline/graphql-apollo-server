import { mockApolloServer, gql, dataSources } from '../../../mocks/serverMock';
import { SingleGraphQLResponse } from '../../../mocks/type';

describe('Authenticate', () => {
  const server = mockApolloServer;

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

    const earnings = (await server.executeOperation(
      {
        query: getEarningByWallet,
        variables: {
          walletID: 'teste_id',
          year: 2022,
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    const bodyData = earnings.body.singleResult.data;

    expect(bodyData).toHaveProperty('getEarningByWallet');
    expect(bodyData.getEarningByWallet[0]).toHaveProperty('_id');
    expect(bodyData.getEarningByWallet[0]).toHaveProperty('year');
    expect(bodyData.getEarningByWallet[0]).toHaveProperty('month');
    expect(bodyData.getEarningByWallet[0]).toHaveProperty('amount');
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

    const earnings = (await server.executeOperation(
      {
        query: getEarningAccByYear,
        variables: {
          walletID: 'teste_id',
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    const bodyData = earnings.body.singleResult.data;

    expect(bodyData).toHaveProperty('getEarningAccByYear');
    expect(bodyData.getEarningAccByYear[0]).toHaveProperty('_id');
    expect(bodyData.getEarningAccByYear[0]).toHaveProperty('year');
    expect(bodyData.getEarningAccByYear[0]).toHaveProperty('amount');
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

    const earnings = (await server.executeOperation(
      {
        query: getSumEarning,
        variables: {
          walletID: 'teste_id',
          year: 2022,
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    const bodyData = earnings.body.singleResult.data;

    expect(bodyData).toHaveProperty('getSumEarning');
    expect(bodyData.getSumEarning).toHaveProperty('sumCurrentYear');
    expect(bodyData.getSumEarning).toHaveProperty('sumOldYear');
    expect(bodyData.getSumEarning).toHaveProperty('sumTotalEarnings');
    expect(bodyData.getSumEarning).toHaveProperty('yieldOnCost');
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

    const earnings = (await server.executeOperation(
      {
        query: updateEarning,
        variables: {
          _id: 'teste_id',
          walletID: 'teste_walletID',
          year: 2022,
          month: 12,
          amount: 20,
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    const bodyData = earnings.body.singleResult.data;

    expect(bodyData).toHaveProperty('updateEarning');
    expect(bodyData.updateEarning).toHaveProperty('_id');
    expect(bodyData.updateEarning).toHaveProperty('year');
    expect(bodyData.updateEarning).toHaveProperty('month');
    expect(bodyData.updateEarning).toHaveProperty('amount');
  });
});
