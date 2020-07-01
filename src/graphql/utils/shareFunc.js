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
};
