const {
  getSumAmountWallet,
  getSumCostWallet,
  getSumGradeWallet,
  getArraySortByParams,
} = require('../graphql/utils/shareFunc');

const getStatus = percent => {
  if (percent === 0) return 'KEEP';
  return percent > 0 ? 'BUY' : 'ANALYZE';
};

module.exports = {
  rentability: currentArray => {
    let sumAmountWallet = getSumAmountWallet(currentArray);
    let sumCostWallet = getSumCostWallet(currentArray);

    const res = currentArray.map(
      ({
        _id,
        symbol,
        longName,
        quantity,
        averagePrice,
        regularMarketPrice,
        financialCurrency,
      }) => {
        let costAmount = quantity * averagePrice;
        let currentAmount = quantity * regularMarketPrice;
        let variationAmount = currentAmount - costAmount;
        let variationPercent = variationAmount / costAmount;

        return {
          _id,
          symbol,
          longName,
          sumCostWallet,
          sumAmountWallet,
          costAmount,
          currentAmount,
          variationAmount,
          variationPercent,
          financialCurrency,
        };
      },
    );
    return res;
  },

  rebalance: (currentArray, sort) => {
    let sumAmountWallet = getSumAmountWallet(currentArray);
    let sumGradeWallet = getSumGradeWallet(currentArray);

    const rebalanced = currentArray.map(
      ({
        _id,
        symbol,
        longName,
        quantity,
        grade,
        regularMarketPrice,
        financialCurrency,
      }) => {
        let currentAmount = quantity * regularMarketPrice;
        let gradePercent = grade / sumGradeWallet;
        let currentPercent = currentAmount / sumAmountWallet;
        let targetPercent = gradePercent - currentPercent;
        let targetAmount = targetPercent * sumAmountWallet;
        let status = getStatus(targetPercent);

        return {
          _id,
          symbol,
          longName,
          status,
          currentAmount,
          gradePercent,
          currentPercent,
          targetPercent,
          targetAmount,
          financialCurrency,
        };
      },
    );

    return getArraySortByParams(rebalanced, sort);
  },
};
