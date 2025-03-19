import { executeOperation, gql } from '../../../mocks/serverMock';

describe('Tickets', () => {
  const GET_TICKETS = gql`
    query getTickets {
      tickets {
        _id
        symbol
      }
    }
  `;

  const GET_TICKETS_BY_WALLET = gql`
    query getTicketsByWallet($walletID: ID!, $sort: SortTickets!) {
      getTicketsByWallet(walletID: $walletID, sort: $sort) {
        _id
        symbol
        name
        quantity
        averagePrice
        grade
        classSymbol
      }
    }
  `;

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

  describe('Queries', () => {
    it('should return tickets', async () => {
      const res = await executeOperation(GET_TICKETS);

      expect(res.body.singleResult.data).toHaveProperty('tickets');
      expect(res.body.singleResult.data.tickets).toBeInstanceOf(Array);
      expect(res.body.singleResult.data.tickets[0]).toHaveProperty('_id');
      expect(res.body.singleResult.data.tickets[0]).toHaveProperty('symbol');
    });

    it('should return tickets by wallet', async () => {
      const res = await executeOperation(GET_TICKETS_BY_WALLET, {
        walletID: 'a',
        sort: 'grade',
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('getTicketsByWallet');
      expect(bodyData.getTicketsByWallet).toBeInstanceOf(Array);
      expect(bodyData.getTicketsByWallet[0]).toHaveProperty('_id');
      expect(bodyData.getTicketsByWallet[0]).toHaveProperty('symbol');
      expect(bodyData.getTicketsByWallet[0]).toHaveProperty('name');
      expect(bodyData.getTicketsByWallet[0]).toHaveProperty('quantity');
      expect(bodyData.getTicketsByWallet[0]).toHaveProperty('averagePrice');
      expect(bodyData.getTicketsByWallet[0]).toHaveProperty('grade');
      expect(bodyData.getTicketsByWallet[0]).toHaveProperty('classSymbol');
    });
  });

  describe('Mutations', () => {
    it('should create ticket', async () => {
      const res = await executeOperation(CREATE_TICKET, {
        walletID: 'a',
        symbol: 'lren3.sa',
        name: 'Lojas Renner SA',
        quantity: 90,
        averagePrice: 31.2,
        grade: 5,
      });

      expect(res.body.singleResult.data).toHaveProperty('createTicket');
    });

    it('should update ticket', async () => {
      const res = await executeOperation(UPDATE_TICKET, {
        _id: '2',
        symbol: 'lren3.sa',
        name: 'Lojas Renner SA',
        quantity: 100,
        averagePrice: 40.2,
        grade: 10,
      });

      expect(res.body.singleResult.data).toHaveProperty('updateTicket');
    });

    it('should delete ticket by id and remove id in wallet', async () => {
      const res = await executeOperation(DELETE_TICKET, {
        id: '1',
        walletID: 'a',
      });

      expect(res.body.singleResult.data).toHaveProperty('deleteTicket');
    });
  });
});
