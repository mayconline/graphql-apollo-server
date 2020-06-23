const api = require('./axios');

const fetchApi = async ticket => {
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
};

module.exports = {
  getFinance: fetchApi,
  getCurrentFinanceByTickets: async ticketArray => {
    return await Promise.all(
      ticketArray.map(
        async ({ _id, symbol, quantity, averagePrice, grade }) => {
          const {
            regularMarketPrice,
            financialCurrency,
            exchange,
            market,
            longName,
          } = await fetchApi(symbol);
          return {
            _id,
            symbol,
            quantity,
            averagePrice,
            grade,
            regularMarketPrice,
            financialCurrency,
            exchange,
            market,
            longName,
          };
        },
      ),
    );
  },
};
