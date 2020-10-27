const api = require('./axios');
const apiDollar = require('./apiDollar');

const getConvertDollar = async (amount, currency) => {
  const getDollar = await apiDollar.get('USDT-BRL');
  const { bid } = await getDollar.data.USDT;

  return currency === 'USD' ? amount * bid : amount;
};

const fetchApi = async ticket => {
  const res = await api.get(`quote?symbols=${ticket}`);

  const { result } = await res.data.quoteResponse;

  const [
    { regularMarketPrice, currency, exchange, market, longName, symbol },
  ] = result;

  const convertedAmount = await getConvertDollar(regularMarketPrice, currency);

  return {
    regularMarketPrice: convertedAmount,
    financialCurrency: currency,
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
