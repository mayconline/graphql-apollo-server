import { api, apiSummary } from './axios';
import apiDollar from './apiDollar';
import { formatTicketByFraction, getTranslateSector } from '../utils/shareFunc';
import { isCripto } from '../utils/classSymbols';

const getURLDollar1 = (olderDays = 1) => {
  let currentDate = new Date().toLocaleDateString();
  const [day, month, year] = currentDate.split('/');

  let date = `${month}-${Number(Number(day) - Number(olderDays))}-${year}`;

  let urlOne = `CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&$format=json`;

  return {
    urlOne,
  };
};

const getConvertDollar = async amount => {
  let dollarBid = 0;

  const { urlOne } = getURLDollar1();

  const getDollar = await apiDollar.get(urlOne);

  console.log(getDollar.data);

  if (!!getDollar?.data?.value.length) {
    const [{ cotacaoCompra }] = getDollar?.data?.value;
    dollarBid = cotacaoCompra;
  }

  if (!getDollar?.data?.value.length) {
    const { urlOne } = getURLDollar1(3);

    const getOlderDollar = await apiDollar.get(urlOne);

    if (!!getOlderDollar?.data?.value.length) {
      const [{ cotacaoCompra }] = getOlderDollar?.data?.value;
      dollarBid = cotacaoCompra;
    }
  }

  if (Number(dollarBid) <= 0) throw new Error('Failed Convert Dollar');

  const converted = Number(amount) * Number(dollarBid);

  return converted;
};

const fetchSummaryApi = async ticket => {
  const formatedTicket = formatTicketByFraction(ticket);

  let profileStock = {
    industry: 'Outros',
    sector: 'Outros',
  };

  try {
    const summary = await apiSummary.get(`quoteSummary/${formatedTicket}`, {
      params: {
        modules: 'summaryProfile',
      },
    });

    if (!!summary) {
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
    }

    if (isCripto(formatedTicket)) {
      profileStock.industry = 'Cripto';
      profileStock.sector = 'Cripto';
    }

    return profileStock;
  } catch (e) {
    return profileStock;
  }
};

const fetchApi = async ticket => {
  const formatedTicket = formatTicketByFraction(ticket);

  try {
    const res = await api.get(`quote?symbols=${formatedTicket}`);

    const { result } = await res.data.quoteResponse;
    if (!result) throw new Error('Failed Stock API');

    const [
      { regularMarketPrice, currency, exchange, market, longName, shortName },
    ] = result;

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
      longName: longName ? longName : shortName ? shortName : formatedTicket,
      industry,
      sector,
    };
  } catch (e) {
    return {
      regularMarketPrice: 0,
      financialCurrency: 'BRL',
      exchange: 'SAO',
      market: 'br_market',
      longName: 'ERROR',
      industry: 'Outros',
      sector: 'Outros',
    };
  }
};

export default {
  getFinance: fetchApi,
  getCurrentFinanceByTickets: async ticketArray => {
    return await Promise.all(
      ticketArray.map(
        async ({ _id, symbol, quantity, averagePrice, grade, classSymbol }) => {
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
            classSymbol,
          };
        },
      ),
    );
  },
};
