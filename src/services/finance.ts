import { api, apiSummary } from './axios';
import apiDollar from './apiDollar';
import { formatTicketByFraction, getTranslateSector } from '../utils/shareFunc';
import { isCripto } from '../utils/classSymbols';

const getURLDollar1 = (olderDays = 1) => {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  let date = `${month}-${Number(Number(day) - Number(olderDays))}-${year}`;

  let urlOne = `CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&format=json`;

  return {
    urlOne,
  };
};

const getConvertDollar = async amount => {
  let dollarBid = 0;

  const { urlOne } = getURLDollar1();

  const getDollar = await apiDollar.get(urlOne);

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
    const summary = await apiSummary.get(`search`, {
      params: {
        q: formatedTicket,
      },
    });

    if (!!summary?.data?.quotes?.length) {
      const resultSummary = summary.data.quotes[0];

      if (
        resultSummary?.industry &&
        resultSummary?.sector &&
        (resultSummary?.industry || resultSummary?.sector) !== ''
      ) {
        profileStock.industry = getTranslateSector(resultSummary.industry);
        profileStock.sector = getTranslateSector(resultSummary.sector);
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
    const res = await api.get(formatedTicket);

    const { result } = await res?.data?.chart;
    if (!result) throw new Error('Failed Stock API');

    const { regularMarketPrice, currency } = result?.[0]?.meta;

    const convertedAmount =
      currency === 'USD'
        ? await getConvertDollar(regularMarketPrice)
        : regularMarketPrice;

    const { industry, sector } = await fetchSummaryApi(ticket);

    return {
      regularMarketPrice: convertedAmount,
      financialCurrency: currency,
      longName: formatedTicket,
      industry,
      sector,
    };
  } catch (e) {
    return {
      regularMarketPrice: 0,
      financialCurrency: 'BRL',
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
