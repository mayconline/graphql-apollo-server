import { api, apiSummary } from './axios';
import apiDollar from './apiDollar';
import { formatTicketByFraction, getTranslateSector } from '../utils/shareFunc';
import { isCripto } from '../utils/classSymbols';
import {
  IFetchConvertDollarApiResponse,
  IFetchStockApiResponse,
  IFetchSummaryApiResponse,
  ITicketResponseProps,
} from '../types';

const getURLDollar1 = (olderDays = 1) => {
  try {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const date = `${month}-${Number(Number(day) - Number(olderDays))}-${year}`;

    const urlOne = `CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&format=json`;

    return {
      urlOne,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getConvertDollar = async (amount: number) => {
  try {
    let dollarBid = 0;

    const { urlOne } = getURLDollar1();

    const getDollar =
      await apiDollar.get<IFetchConvertDollarApiResponse>(urlOne);

    const hasDollarPrice = !!getDollar?.data?.value?.length;

    if (hasDollarPrice) {
      const cotacaoCompra = getDollar?.data?.value?.[0]?.cotacaoCompra;
      dollarBid = cotacaoCompra;
    } else {
      const { urlOne } = getURLDollar1(3);

      const getOlderDollar =
        await apiDollar.get<IFetchConvertDollarApiResponse>(urlOne);

      if (getOlderDollar?.data?.value?.length) {
        const cotacaoCompra = getOlderDollar?.data?.value?.[0]?.cotacaoCompra;
        dollarBid = cotacaoCompra;
      }
    }

    if (Number(dollarBid) <= 0) throw new Error('Failed Convert Dollar');

    const converted = Number(amount) * Number(dollarBid);

    return converted;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const fetchSummaryApi = async ticket => {
  const formatedTicket = formatTicketByFraction(ticket);

  const profileStock = {
    industry: 'Outros',
    sector: 'Outros',
  };

  try {
    const summary = await apiSummary.get<IFetchSummaryApiResponse>(`search`, {
      params: {
        q: formatedTicket,
      },
    });

    if (summary?.data?.quotes?.length) {
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
    console.log('Error at fetchSummaryApi:', e);

    return profileStock;
  }
};

const fetchApi = async (ticket: string) => {
  const formatedTicket = formatTicketByFraction(ticket);

  try {
    const res = await api.get<IFetchStockApiResponse>(formatedTicket);

    const result = res?.data?.chart?.result?.[0]?.meta;
    if (!result) throw new Error('Failed Stock API');

    const { regularMarketPrice, currency } = result;

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
  } catch (e: any) {
    console.log('Error at fetchApi:', e);

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
  getCurrentFinanceByTickets: async (ticketArray: ITicketResponseProps[]) => {
    try {
      return await Promise.all(
        ticketArray.map(
          async ({
            _id,
            symbol,
            quantity,
            averagePrice,
            grade,
            classSymbol,
            name,
          }) => {
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
              longName: name || longName,
              industry,
              sector,
              classSymbol,
            };
          },
        ),
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
