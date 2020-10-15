const {
  server,
  createTestClient,
  gql,
} = require('../../utils/mocks/serverMock');

describe('Mutation Test', () => {
  const { mutate } = createTestClient(server);

  const CREATE_TICKET = gql`
    mutation createTicket(
      $walletID: ID!
      $symbol: String!
      $name: String!
      $quantity: Float!
      $averagePrice: Float!
      $grade: Int!
    ) {
      createTicket(
        input: {
          walletID: $walletID
          symbol: $symbol
          name: $name
          quantity: $quantity
          averagePrice: $averagePrice
          grade: $grade
        }
      ) {
        _id
        symbol
        quantity
        averagePrice
        grade
        name
      }
    }
  `;

  const UPDATE_TICKET = gql`
    mutation updateTicket(
      $id: ID!
      $walletID: ID!
      $symbol: String!
      $name: String!
      $quantity: Float!
      $averagePrice: Float!
      $grade: Int!
    ) {
      updateTicket(
        _id: $id
        input: {
          walletID: $walletID
          symbol: $symbol
          name: $name
          quantity: $quantity
          averagePrice: $averagePrice
          grade: $grade
        }
      ) {
        _id
        symbol
        quantity
        averagePrice
        grade
        name
      }
    }
  `;

  const DELETE_TICKET = gql`
    mutation deleteTicket($id: ID!, $walletID: ID!) {
      deleteTicket(_id: $id, walletID: $walletID)
    }
  `;

  it('should create ticket', async () => {
    const res = await mutate({
      mutation: CREATE_TICKET,
      variables: {
        walletID: 'a',
        symbol: 'lren3.sa',
        name: 'Lojas Renner SA',
        quantity: 90,
        averagePrice: 31.2,
        grade: 5,
      },
    });

    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('createTicket');
  });

  it('should update ticket', async () => {
    const res = await mutate({
      mutation: UPDATE_TICKET,
      variables: {
        id: '2',
        walletID: 'a',
        symbol: 'lren3.sa',
        name: 'Lojas Renner SA',
        quantity: 100,
        averagePrice: 40.2,
        grade: 10,
      },
    });

    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('updateTicket');
  });

  it('should delete ticket by id and remove id in wallet', async () => {
    const res = await mutate({
      mutation: DELETE_TICKET,
      variables: {
        id: '1',
        walletID: 'a',
      },
    });

    expect(res).toMatchSnapshot();
    expect(res.data).toHaveProperty('deleteTicket');
  });
});
