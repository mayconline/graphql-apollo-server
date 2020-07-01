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
};
