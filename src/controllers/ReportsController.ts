import type { IFinanceControllerArgs, IReportsResponseProps } from '../types';
import {
  getSumAmountWallet,
  getRandomDarkColor,
  getArraySortByParams,
  getSumByUnicProp,
} from '../utils/shareFunc';

export default {
  getEachTicketChart: (
    currentArray: IFinanceControllerArgs[],
  ): IReportsResponseProps[] => {
    try {
      const sumAmountWallet = getSumAmountWallet(currentArray) || 1;

      const chart = currentArray.map(
        ({ _id, symbol, quantity, regularMarketPrice }) => {
          const currentAmount = quantity * regularMarketPrice;
          const currentPercent = (currentAmount / sumAmountWallet) * 100;

          return {
            _id,
            key: symbol,
            value: currentPercent,
            color: getRandomDarkColor(),
          };
        },
      );

      const chartByClass = getSumByUnicProp(chart, 'key', 'value');

      const sortedArray = getArraySortByParams(chartByClass, 'value');

      return sortedArray;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getEachClassChart: (currentArray: IFinanceControllerArgs[]) => {
    try {
      const sumAmountWallet = getSumAmountWallet(currentArray) || 1;

      const chart = currentArray.map(
        ({ _id, quantity, regularMarketPrice, classSymbol }) => {
          const currentAmount = quantity * regularMarketPrice;
          const currentPercent = (currentAmount / sumAmountWallet) * 100;

          return {
            _id,
            key: classSymbol,
            value: currentPercent,
            color: getRandomDarkColor(),
          };
        },
      );

      const chartByClass = getSumByUnicProp(chart, 'key', 'value');

      const sortedArray = getArraySortByParams(chartByClass, 'value');

      return sortedArray;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getEachSectorChart: (currentArray: IFinanceControllerArgs[]) => {
    try {
      const sumAmountWallet = getSumAmountWallet(currentArray) || 1;

      const chart = currentArray.map(
        ({ _id, quantity, regularMarketPrice, sector }) => {
          const currentAmount = quantity * regularMarketPrice;
          const currentPercent = (currentAmount / sumAmountWallet) * 100;

          return {
            _id,
            key: sector,
            value: currentPercent,
            color: getRandomDarkColor(),
          };
        },
      );

      const chartByClass = getSumByUnicProp(chart, 'key', 'value');

      const sortedArray = getArraySortByParams(chartByClass, 'value');

      return sortedArray;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getEachIndustryChart: (currentArray: IFinanceControllerArgs[]) => {
    try {
      const sumAmountWallet = getSumAmountWallet(currentArray) || 1;

      const chart = currentArray.map(
        ({ _id, quantity, regularMarketPrice, industry }) => {
          const currentAmount = quantity * regularMarketPrice;
          const currentPercent = (currentAmount / sumAmountWallet) * 100;

          return {
            _id,
            key: industry,
            value: currentPercent,
            color: getRandomDarkColor(),
          };
        },
      );

      const chartByClass = getSumByUnicProp(chart, 'key', 'value');

      const sortedArray = getArraySortByParams(chartByClass, 'value');

      return sortedArray;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
