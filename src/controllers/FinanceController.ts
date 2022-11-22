import {
  getSumAmountWallet,
  getSumCostWallet,
  getSumGradeWallet,
  getArraySortByParams,
  getPercentVariation,
} from '../utils/shareFunc';

const getStatus = percent => {
  if (percent === 0) return 'KEEP';
  return percent > 0 ? 'BUY' : 'ANALYZE';
};

export default {
  rentability: (currentArray, sort) => {
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
        let variationPercent = getPercentVariation(costAmount, currentAmount);

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
    return getArraySortByParams(res, sort);
  },

  rebalance: (currentArray, sort) => {
    let sumAmountWallet = getSumAmountWallet(currentArray) || 1;
    let sumGradeWallet = getSumGradeWallet(currentArray) || 1;

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
        let gradePercent = (grade / sumGradeWallet) * 100;
        let currentPercent = (currentAmount / sumAmountWallet) * 100;
        let targetPercent = gradePercent - currentPercent;
        let targetAmount = (targetPercent * sumAmountWallet) / 100;
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
