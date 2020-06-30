const {
  server,
  createTestClient,
  gql,
} = require('../../utils/mocks/serverMock');

describe('Query Test', () => {
  const { query } = createTestClient(server);

  const GET_WALLETS_BY_USER = gql`
    query getWalletByUser($userID: ID!) {
      getWalletByUser(userID: $userID) {
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
    const res = await query({
      query: GET_WALLETS_BY_USER,
      variables: { userID: '1' },
    });
    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('getWalletByUser');
    expect(res.data.getWalletByUser[0]).toHaveProperty('_id');
  });
});

describe('Mutation Test', () => {
  const { mutate } = createTestClient(server);

  const CREATE_WALLET = gql`
    mutation createWallet($userID: ID!, $description: String!) {
      createWallet(input: { userID: $userID, description: $description }) {
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
    mutation updateWallet($id: ID!, $userID: ID!, $description: String!) {
      updateWallet(
        _id: $id
        input: { userID: $userID, description: $description }
      ) {
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
    const res = await mutate({
      mutation: CREATE_WALLET,
      variables: {
        userID: '1',
        description: 'Carteira Mock',
      },
    });

    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('createWallet');
  });

  it('should update wallet', async () => {
    const res = await mutate({
      mutation: UPDATE_WALLET,
      variables: {
        id: 'a',
        userID: '1',
        description: 'Ações',
      },
    });

    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('updateWallet');
  });

  it('should delete wallet by id', async () => {
    const res = await mutate({
      mutation: DELETE_WALLET,
      variables: {
        id: 'a',
      },
    });

    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('deleteWallet');
  });
});
