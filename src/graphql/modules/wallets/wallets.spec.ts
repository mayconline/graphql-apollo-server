import { mockApolloServer, gql, dataSources } from '../../../mocks/serverMock';
import { SingleGraphQLResponse } from '../../../mocks/type';

const server = mockApolloServer;

describe('Query Test', () => {
  const GET_WALLETS_BY_USER = gql`
    query getWalletByUser {
      getWalletByUser {
        _id
        description
        sumCostWallet
        sumAmountWallet
        sumGradeWallet
        user {
          _id
          email
        }
        ticket {
          _id
          symbol
          quantity
          averagePrice
          grade
        }
      }
    }
  `;

  it('should return wallets array', async () => {
    const res = (await server.executeOperation(
      {
        query: GET_WALLETS_BY_USER,
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    const bodyData = res.body.singleResult.data;

    expect(bodyData).toHaveProperty('getWalletByUser');
    expect(bodyData.getWalletByUser[0]).toHaveProperty('_id');
  });
});

describe('Mutation Test', () => {
  const CREATE_WALLET = gql`
    mutation createWallet($description: String!) {
      createWallet(input: { description: $description }) {
        _id
        description
        sumCostWallet
        sumAmountWallet
        sumGradeWallet
        ticket {
          _id
          symbol
          quantity
          averagePrice
          grade
        }
        user {
          _id
          email
        }
      }
    }
  `;

  const UPDATE_WALLET = gql`
    mutation updateWallet($id: ID!, $description: String!) {
      updateWallet(_id: $id, input: { description: $description }) {
        _id
        description
      }
    }
  `;

  const DELETE_WALLET = gql`
    mutation deleteWallet($id: ID!) {
      deleteWallet(_id: $id)
    }
  `;

  it('should create wallet', async () => {
    const res = (await server.executeOperation(
      {
        query: CREATE_WALLET,
        variables: {
          description: 'Carteira Mock',
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    expect(res.body.singleResult.data).toHaveProperty('createWallet');
  });

  it('should update wallet', async () => {
    const res = (await server.executeOperation(
      {
        query: UPDATE_WALLET,
        variables: {
          id: 'a',
          description: 'Ações',
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    expect(res.body.singleResult.data).toHaveProperty('updateWallet');
  });

  it('should delete wallet by id', async () => {
    const res = (await server.executeOperation(
      {
        query: DELETE_WALLET,
        variables: {
          id: 'a',
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    expect(res.body.singleResult.data).toHaveProperty('deleteWallet');
  });
});
