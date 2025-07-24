import { executeOperation, gql } from '../../../mocks/serverMock';

describe('Wallets', () => {
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

  const GET_WALLET_BY_ID = gql`
    query getWalletById($id: ID!) {
      getWalletById(_id: $id) {
        _id
        description
        sumCostWallet
        sumAmountWallet
        sumGradeWallet
        percentRentabilityWallet
        percentPositionWallet
        sumAmountAllWallet
        ticket {
          _id
          symbol
          name
          quantity
          averagePrice
          grade
          classSymbol
        }
        user {
          _id
          email
        }
      }
    }
  `;

  const WALLETS = gql`
    query WALLETS {
      wallets {
        _id
        description
        sumCostWallet
        sumAmountWallet
        sumGradeWallet
        percentRentabilityWallet
        percentPositionWallet
        sumAmountAllWallet
        user {
          _id
          email
        }
        ticket {
          _id
          symbol
          name
          quantity
          averagePrice
          grade
          classSymbol
        }
      }
    }
  `;

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

  describe('Queries', () => {
    it('should return wallets array by user', async () => {
      const res = await executeOperation(GET_WALLETS_BY_USER);

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('getWalletByUser');
      expect(bodyData.getWalletByUser).toHaveProperty('length');
      expect(bodyData.getWalletByUser[0]).toHaveProperty('_id');
      expect(bodyData.getWalletByUser[0]).toHaveProperty('description');
      expect(bodyData.getWalletByUser[0]).toHaveProperty('sumCostWallet');
      expect(bodyData.getWalletByUser[0]).toHaveProperty('sumAmountWallet');
      expect(bodyData.getWalletByUser[0]).toHaveProperty('sumGradeWallet');
      expect(bodyData.getWalletByUser[0]).toHaveProperty('user');
      expect(bodyData.getWalletByUser[0].user).toHaveProperty('_id');
      expect(bodyData.getWalletByUser[0].user).toHaveProperty('email');
      expect(bodyData.getWalletByUser[0]).toHaveProperty('ticket');
      expect(bodyData.getWalletByUser[0].ticket[0]).toHaveProperty('_id');
      expect(bodyData.getWalletByUser[0].ticket[0]).toHaveProperty('symbol');
      expect(bodyData.getWalletByUser[0].ticket[0]).toHaveProperty('quantity');
      expect(bodyData.getWalletByUser[0].ticket[0]).toHaveProperty(
        'averagePrice'
      );
      expect(bodyData.getWalletByUser[0].ticket[0]).toHaveProperty('grade');
    });

    it('should return wallet by id', async () => {
      const res = await executeOperation(GET_WALLET_BY_ID, {
        id: 'a',
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('getWalletById');
      expect(bodyData.getWalletById).toHaveProperty('_id');
      expect(bodyData.getWalletById).toHaveProperty('description');
      expect(bodyData.getWalletById).toHaveProperty('sumCostWallet');
      expect(bodyData.getWalletById).toHaveProperty('sumAmountWallet');
      expect(bodyData.getWalletById).toHaveProperty('sumGradeWallet');
      expect(bodyData.getWalletById).toHaveProperty('user');
      expect(bodyData.getWalletById.user).toHaveProperty('_id');
      expect(bodyData.getWalletById.user).toHaveProperty('email');
      expect(bodyData.getWalletById).toHaveProperty('ticket');
      expect(bodyData.getWalletById.ticket[0]).toHaveProperty('_id');
      expect(bodyData.getWalletById.ticket[0]).toHaveProperty('symbol');
      expect(bodyData.getWalletById.ticket[0]).toHaveProperty('quantity');
      expect(bodyData.getWalletById.ticket[0]).toHaveProperty('averagePrice');
      expect(bodyData.getWalletById.ticket[0]).toHaveProperty('grade');
    });

    it('should return wallets array', async () => {
      const res = await executeOperation(WALLETS);

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('wallets');
      expect(bodyData.wallets).toHaveProperty('length');
      expect(bodyData.wallets[0]).toHaveProperty('_id');
      expect(bodyData.wallets[0]).toHaveProperty('description');
      expect(bodyData.wallets[0]).toHaveProperty('sumCostWallet');
      expect(bodyData.wallets[0]).toHaveProperty('sumAmountWallet');
      expect(bodyData.wallets[0]).toHaveProperty('sumGradeWallet');
      expect(bodyData.wallets[0]).toHaveProperty('percentRentabilityWallet');
      expect(bodyData.wallets[0]).toHaveProperty('percentPositionWallet');
      expect(bodyData.wallets[0]).toHaveProperty('sumAmountAllWallet');
      expect(bodyData.wallets[0]).toHaveProperty('user');
      expect(bodyData.wallets[0].user).toHaveProperty('_id');
      expect(bodyData.wallets[0].user).toHaveProperty('email');
      expect(bodyData.wallets[0]).toHaveProperty('ticket');
      expect(bodyData.wallets[0].ticket[0]).toHaveProperty('_id');
      expect(bodyData.wallets[0].ticket[0]).toHaveProperty('symbol');
      expect(bodyData.wallets[0].ticket[0]).toHaveProperty('quantity');
      expect(bodyData.wallets[0].ticket[0]).toHaveProperty('averagePrice');
      expect(bodyData.wallets[0].ticket[0]).toHaveProperty('grade');
      expect(bodyData.wallets[0].ticket[0]).toHaveProperty('classSymbol');
      expect(bodyData.wallets[0].ticket[0]).toHaveProperty('name');
    });
  });

  describe('Mutations', () => {
    it('should create wallet', async () => {
      const res = await executeOperation(CREATE_WALLET, {
        description: 'Carteira Mock',
      });

      expect(res.body.singleResult.data).toHaveProperty('createWallet');
    });

    it('should update wallet', async () => {
      const res = await executeOperation(UPDATE_WALLET, {
        id: 'a',
        description: 'Ações',
      });

      expect(res.body.singleResult.data).toHaveProperty('updateWallet');
    });

    it('should delete wallet by id', async () => {
      const res = await executeOperation(DELETE_WALLET, {
        id: 'a',
      });

      expect(res.body.singleResult.data).toHaveProperty('deleteWallet');
    });
  });
});
