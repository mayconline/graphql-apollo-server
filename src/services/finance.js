const api = require('./axios');

module.exports = {
  getFinance: async ticket => {
    const res = await api.get(`quote?symbols=${ticket}`);
    const { result } = await res.data.quoteResponse;

    const [
      {
        regularMarketPrice,
        financialCurrency,
        exchange,
        market,
        longName,
        symbol,
      },
    ] = result;

    return {
      regularMarketPrice,
      financialCurrency,
      exchange,
      market,
      longName,
      symbol,
    };
  },
};
