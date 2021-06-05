const {
  getSumAmountWallet,
  getRandomDarkColor,
  getArraySortByParams,
  getClassTicket,
  formatSymbol,
  getPercentTicketPerClass,
} = require('../graphql/utils/shareFunc');

module.exports = {
  getEachTicketChart: currentArray => {
    let sumAmountWallet = getSumAmountWallet(currentArray);

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
    let sumAmountWallet = getSumAmountWallet(currentArray);

    const chart = currentArray.map(
      ({ _id, symbol, quantity, regularMarketPrice }) => {
        let currentAmount = quantity * regularMarketPrice;
        let currentPercent = (currentAmount / sumAmountWallet) * 100;

        return {
          _id,
          key: getClassTicket(formatSymbol(symbol)),
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
