const jwt = require('jsonwebtoken');
const { getErrorMessage } = require('./errorHandler');

module.exports = {
  getSumGradeWallet: currentArray =>
    currentArray.reduce((acc, cur) => acc + cur.grade, 0),

  getSumCostWallet: currentArray =>
    currentArray.reduce((acc, cur) => acc + cur.quantity * cur.averagePrice, 0),

  getSumAmountWallet: currentArray =>
    currentArray.reduce(
      (acc, cur) => acc + cur.quantity * cur.regularMarketPrice,
      0,
    ),

  getPercentVariation: (SumCost, SumAmount) => {
    let calcPercent = ((SumAmount - SumCost) / SumCost) * 100;

    const percentVariation =
      SumAmount === SumCost
        ? 0
        : SumCost < 0 && SumAmount === 0
        ? 100
        : SumCost === 0 && SumAmount < 0
        ? -100
        : SumCost === 0 && SumAmount > 0
        ? 100
        : SumCost > 0
        ? calcPercent
        : SumCost < 0 && calcPercent * -1;

    return percentVariation;
  },

  getArraySortByParams: (array, params) =>
    array.sort((a, b) => {
      let itema = a[params];
      let itemb = b[params];

      if (typeof itema === 'number') {
        return itemb - itema;
      } else {
        if (itemb < itema) return 1;
        if (itemb > itema) return -1;
        return 0;
      }
    }),

  setToken: async (_id, role) =>
    jwt.sign({ _id, role }, process.env.JWT_TOKEN, {
      expiresIn: process.env.JWT_EXPIRE,
    }),

  getToken: ({ headers }) => {
    const { authorization } = headers;
    if (!authorization) return null;

    const token = authorization.replace('Bearer', '').trim();

    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      return decoded;
    } catch {
      throw new Error('Token Invalid or Expired');
    }
  },
};
