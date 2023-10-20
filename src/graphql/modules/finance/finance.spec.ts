import { mockApolloServer, gql, dataSources } from '../../../mocks/serverMock';
import { SingleGraphQLResponse } from '../../../mocks/type';

describe('Query Test', () => {
  const server = mockApolloServer;

  const GET_API_FINANCE = gql`
    query getApiFinance($symbol: String) {
      getApiFinance(symbol: $symbol) {
        regularMarketPrice
        financialCurrency
        longName
        symbol
      }
    }
  `;

  it('should return ticket details', async () => {
    const res = (await server.executeOperation(
      {
        query: GET_API_FINANCE,
        variables: { symbol: 'mglu3.sa' },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    const bodyData = res.body.singleResult.data;

    expect(bodyData).toHaveProperty('getApiFinance');
    expect(bodyData.getApiFinance).toHaveProperty('regularMarketPrice');
    expect(bodyData.getApiFinance).toHaveProperty('financialCurrency');
    expect(bodyData.getApiFinance).toHaveProperty('longName');
    expect(bodyData.getApiFinance).toHaveProperty('sector');
    expect(bodyData.getApiFinance).toHaveProperty('industry');
  });
});
