import { mockApolloServer, gql, dataSources } from '../../../mocks/serverMock';
import { SingleGraphQLResponse } from '../../../mocks/type';

describe('Mutation Test', () => {
  const server = mockApolloServer;

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
        walletID: $walletID
        input: {
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
      $_id: ID!
      $symbol: String!
      $name: String!
      $quantity: Float!
      $averagePrice: Float!
      $grade: Int!
    ) {
      updateTicket(
        _id: $_id
        input: {
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
    const res = (await server.executeOperation(
      {
        query: CREATE_TICKET,
        variables: {
          walletID: 'a',
          symbol: 'lren3.sa',
          name: 'Lojas Renner SA',
          quantity: 90,
          averagePrice: 31.2,
          grade: 5,
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    expect(res.body.singleResult.data).toHaveProperty('createTicket');
  });

  it('should update ticket', async () => {
    const res = (await server.executeOperation(
      {
        query: UPDATE_TICKET,
        variables: {
          _id: '2',
          symbol: 'lren3.sa',
          name: 'Lojas Renner SA',
          quantity: 100,
          averagePrice: 40.2,
          grade: 10,
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    expect(res.body.singleResult.data).toHaveProperty('updateTicket');
  });

  it('should delete ticket by id and remove id in wallet', async () => {
    const res = (await server.executeOperation(
      {
        query: DELETE_TICKET,
        variables: {
          id: '1',
          walletID: 'a',
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    expect(res.body.singleResult.data).toHaveProperty('deleteTicket');
  });
});
