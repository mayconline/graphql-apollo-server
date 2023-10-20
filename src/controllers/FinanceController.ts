import {
  IFinanceControllerArgs,
  IRebalanceResponseProps,
  IRentabilityResponseProps,
  SORT_REBALANCE,
  SORT_RENTABILITY,
} from '../types';
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
  rentability: (
    currentArray: IFinanceControllerArgs[],
    sort: SORT_RENTABILITY,
  ): IRentabilityResponseProps[] => {
    try {
      const sumAmountWallet = getSumAmountWallet(currentArray);
      const sumCostWallet = getSumCostWallet(currentArray);

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
          const costAmount = quantity * averagePrice;
          const currentAmount = quantity * regularMarketPrice;
          const variationAmount = currentAmount - costAmount;
          const variationPercent = getPercentVariation(
            costAmount,
            currentAmount,
          );

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
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  rebalance: (
    currentArray: IFinanceControllerArgs[],
    sort: SORT_REBALANCE,
  ): IRebalanceResponseProps[] => {
    try {
      const sumAmountWallet = getSumAmountWallet(currentArray) || 1;
      const sumGradeWallet = getSumGradeWallet(currentArray) || 1;

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
          const currentAmount = quantity * regularMarketPrice;
          const gradePercent = (grade / sumGradeWallet) * 100;
          const currentPercent = (currentAmount / sumAmountWallet) * 100;
          const targetPercent = gradePercent - currentPercent;
          const targetAmount = (targetPercent * sumAmountWallet) / 100;
          const status = getStatus(targetPercent);

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
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
