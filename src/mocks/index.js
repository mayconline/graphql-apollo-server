module.exports = {
  users: [
    {
      _id: 1,
      email: 'teste@teste.com.br',
      password: 123,
      active: true,
      checkTerms: true,
    },
    {
      _id: 2,
      email: 'digding@dig.com.br',
      password: 123,
      active: true,
      checkTerms: true,
    },
  ],
  wallets: [
    {
      _id: 'a',
      user: 1,
      description: 'Carteira de Ações',
      totalValue: 300.2,
      ticket: [1, 2, 4],
    },
    {
      _id: 'b',
      user: 2,
      description: 'Carteira de Ações do Be',
      totalValue: 150.1,
      ticket: [3],
    },
    {
      _id: 'c',
      user: 1,
      description: 'Carteira de Ações Americanas',
      totalValue: 400.45,
      ticket: [2],
    },
  ],
  tickets: [
    {
      _id: 1,
      symbol: 'wege3.sa',
      quantity: 10,
      averagePrice: 30.2,
      grade: 10,
    },
    {
      _id: 2,
      symbol: 'itsa4.sa',
      quantity: 5,
      averagePrice: 8.2,
      grade: 10,
    },
    {
      _id: 3,
      symbol: 'itsa4.sa',
      quantity: 10,
      averagePrice: 9,
      grade: 10,
    },
    {
      _id: 4,
      symbol: 'itsa4.sa',
      quantity: 1,
      averagePrice: 9.5,
      grade: 7,
    },
  ],
};
