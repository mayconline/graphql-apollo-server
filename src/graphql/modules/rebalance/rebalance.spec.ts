import { mockApolloServer, gql, dataSources } from '../../../mocks/serverMock';
import { SingleGraphQLResponse } from '../../../mocks/type';

describe('Query Test', () => {
  const server = mockApolloServer;

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

  it('should return ticket rebalanced', async () => {
    const res = (await server.executeOperation(
      {
        query: REBALANCES,
        variables: { walletID: 'a', sort: 'targetAmount' },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

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
