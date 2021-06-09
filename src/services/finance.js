const { api, apiSummary } = require('./axios');
const apiDollar = require('./apiDollar');
const apiDollar2 = require('./apiDollar2');
const { getTranslateSector } = require('../graphql/utils/shareFunc');

const getConvertDollar = async amount => {
  let dollarBid = 0;

  const getDollar2 = await apiDollar2.get('json/all/USD-BRL');
  let hasData = !!getDollar2?.data;

  if (hasData) {
    const { bid } = getDollar2?.data?.USD;
    dollarBid = bid;
  }

  if (!hasData) {
    console.warn('Failed Convert Dollar API 2');

    let currentDate = new Date().toLocaleDateString();
    const [day, month, year] = currentDate.split('/');

    let date = `${month}-${day}-${year}`;

    let urlOne = `CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&$format=json`;

    const getDollar = await apiDollar.get(urlOne);

    if (!getDollar?.data?.value.length) {
      console.warn('Failed Convert Dollar API 1');
      throw new Error('Failed Convert Dollar');
    }

    const [{ cotacaoCompra }] = getDollar?.data?.value;
    dollarBid = cotacaoCompra;
  }

  if (dollarBid <= 0) throw new Error('Failed Convert Dollar');

  const converted = amount * dollarBid;

  return converted;
};

const fetchSummaryApi = async ticket => {
  const summary = await apiSummary.get(`quoteSummary/${ticket}`, {
    params: {
      modules: 'summaryProfile',
    },
  });

  let profileStock = {
    industry: 'OUTROS',
    sector: 'OUTROS',
  };

  const { result: resultSummary } = await summary.data.quoteSummary;

  if (!!resultSummary) {
    const [{ summaryProfile }] = resultSummary;

    if (
      summaryProfile?.industry &&
      summaryProfile?.sector &&
      (summaryProfile?.industry || summaryProfile?.sector) !== ''
    ) {
      profileStock.industry = getTranslateSector(summaryProfile.industry);
      profileStock.sector = getTranslateSector(summaryProfile.sector);
    }
  }

  return profileStock;
};

const fetchApi = async ticket => {
  const res = await api.get(`quote?symbols=${ticket}`);

  const { result } = await res.data.quoteResponse;
  if (!result) throw new Error('Failed Stock API');

  const [{ regularMarketPrice, currency, exchange, market, longName, symbol }] =
    result;

  const convertedAmount =
    currency === 'USD'
      ? await getConvertDollar(regularMarketPrice)
      : regularMarketPrice;

  const { industry, sector } = await fetchSummaryApi(ticket);

  return {
    regularMarketPrice: convertedAmount,
    financialCurrency: currency,
    exchange,
    market,
    longName,
    symbol,
    industry,
    sector,
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
            industry,
            sector,
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
            industry,
            sector,
          };
        },
      ),
    );
  },
};
