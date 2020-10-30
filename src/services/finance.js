const api = require('./axios');
const apiDollar = require('./apiDollar');

const getConvertDollar = async amount => {
  let currentDate = new Date().toLocaleDateString();
  const [day, month, year] = currentDate.split('/');

  let date = `${month}-${day}-${year}`;
  let url = `CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&$format=json`;

  const getDollar = await apiDollar.get(url);
  const [{ cotacaoCompra }] = getDollar?.data?.value;
  if (!cotacaoCompra) throw new Error('Failed Convert Dollar');

  const converted = amount * cotacaoCompra;

  return converted;
};

const fetchApi = async ticket => {
  const res = await api.get(`quote?symbols=${ticket}`);

  const { result } = await res.data.quoteResponse;
  if (!result) throw new Error('Failed Stock API');

  const [
    { regularMarketPrice, currency, exchange, market, longName, symbol },
  ] = result;

  const convertedAmount =
    currency === 'USD'
      ? await getConvertDollar(regularMarketPrice)
      : regularMarketPrice;

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
