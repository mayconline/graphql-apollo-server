const {
  getSumAmountWallet,
  getRandomDarkColor,
  getArraySortByParams,
  getPercentTicketPerClass,
} = require('../graphql/utils/shareFunc');

module.exports = {
  getEachTicketChart: currentArray => {
    let sumAmountWallet = getSumAmountWallet(currentArray) || 1;

    const chart = currentArray.map(
      ({ _id, symbol, quantity, regularMarketPrice }) => {
        let currentAmount = quantity * regularMarketPrice;
        let currentPercent = (currentAmount / sumAmountWallet) * 100;

        return {
          _id,
          key: symbol,
          value: currentPercent,
          color: getRandomDarkColor(),
        };
      },
    );

    const sortedArray = getArraySortByParams(chart, 'value');

    return sortedArray;
  },
  getEachClassChart: currentArray => {
    let sumAmountWallet = getSumAmountWallet(currentArray) || 1;

    const chart = currentArray.map(
      ({ _id, quantity, regularMarketPrice, classSymbol }) => {
        let currentAmount = quantity * regularMarketPrice;
        let currentPercent = (currentAmount / sumAmountWallet) * 100;

        return {
          _id,
          key: classSymbol,
          value: currentPercent,
          color: getRandomDarkColor(),
        };
      },
    );

    const chartByClass = getPercentTicketPerClass(chart);

    const sortedArray = getArraySortByParams(chartByClass, 'value');

    return sortedArray;
  },
  getEachSectorChart: currentArray => {
    let sumAmountWallet = getSumAmountWallet(currentArray) || 1;

    const chart = currentArray.map(
      ({ _id, quantity, regularMarketPrice, sector }) => {
        let currentAmount = quantity * regularMarketPrice;
        let currentPercent = (currentAmount / sumAmountWallet) * 100;

        return {
          _id,
          key: sector,
          value: currentPercent,
          color: getRandomDarkColor(),
        };
      },
    );

    const chartByClass = getPercentTicketPerClass(chart);

    const sortedArray = getArraySortByParams(chartByClass, 'value');

    return sortedArray;
  },
  getEachIndustryChart: currentArray => {
    let sumAmountWallet = getSumAmountWallet(currentArray) || 1;

    const chart = currentArray.map(
      ({ _id, quantity, regularMarketPrice, industry }) => {
        let currentAmount = quantity * regularMarketPrice;
        let currentPercent = (currentAmount / sumAmountWallet) * 100;

        return {
          _id,
          key: industry,
          value: currentPercent,
          color: getRandomDarkColor(),
        };
      },
    );

    const chartByClass = getPercentTicketPerClass(chart);

    const sortedArray = getArraySortByParams(chartByClass, 'value');

    return sortedArray;
  },
};
