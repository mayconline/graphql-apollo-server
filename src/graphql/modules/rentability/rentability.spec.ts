import { mockApolloServer, gql, dataSources } from '../../../mocks/serverMock';
import { SingleGraphQLResponse } from '../../../mocks/type';

describe('Query Test', () => {
  const server = mockApolloServer;

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
    const res = (await server.executeOperation(
      {
        query: GET_RENTABILITY,
        variables: { walletID: 'a', sort: 'variationPercent' },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

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
