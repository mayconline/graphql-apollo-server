import { sign, verify } from 'jsonwebtoken';
import { PUBLIC_ROUTES } from '../constants';
import { env } from '../services/env';
import type { GetTokenResponseProps } from '../types';
import { isCripto, isETF, isUnit } from './classSymbols';

export function getSumGradeWallet(currentArray: any[]) {
  return currentArray.reduce((acc, cur) => acc + cur.grade, 0);
}
export function getSumCostWallet(currentArray: any[]) {
  return currentArray.reduce(
    (acc, cur) => acc + cur.quantity * cur.averagePrice,
    0
  );
}
export function getSumAmountWallet(currentArray: any[]) {
  return currentArray.reduce(
    (acc, cur) => acc + cur.quantity * cur.regularMarketPrice,
    0
  );
}
export function getSumAmountEarning(currentArray: any[]) {
  return currentArray.reduce((acc, cur) => acc + cur.amount, 0);
}
export function getPercentVariation(SumCost: number, SumAmount: number) {
  const calcPercent = ((SumAmount - SumCost) / SumCost || 1) * 100;

  const percentVariation =
    SumAmount === SumCost
      ? 0
      : SumCost < 0 && SumAmount === 0
        ? 100
        : SumCost === 0 && SumAmount < 0
          ? -100
          : SumCost === 0 && SumAmount > 0
            ? 100
            : SumCost > 0
              ? calcPercent
              : SumCost < 0 && calcPercent * -1;

  return percentVariation;
}
export function getArraySortByParams(
  array: any[],
  params: string,
  inverse = false
) {
  return array.sort((a, b) => {
    const itema = a[params];
    const itemb = b[params];

    if (typeof itema === 'number') {
      return inverse ? itema - itemb : itemb - itema;
    }
    if (itemb < itema) {
      return 1;
    }
    if (itemb > itema) {
      return -1;
    }
    return 0;
  });
}
export function setToken(_id: any, role: any) {
  return sign({ _id, role }, env.JWT_TOKEN, {
    expiresIn: env.JWT_EXPIRE as any,
  });
}

export function getToken({ headers, body }: GetTokenResponseProps) {
  if (PUBLIC_ROUTES.includes(body?.operationName)) {
    return null;
  }

  const { authorization } = headers;
  if (!authorization) {
    return null;
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const decoded = verify(token, env.JWT_TOKEN);

    return { decoded, token };
  } catch {
    throw new Error('Token Invalid or Expired');
  }
}
export function formatSymbol(symbol: string) {
  return symbol.toUpperCase().replace('.SA', '').trim();
}
export function getRandomDarkColor() {
  const lum = -0.25;
  let hex = String(
    `#${Math.random().toString(16).slice(2, 8).toUpperCase()}`
  ).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  let rgb = '#';
  let c: any;
  let i: any;
  for (i = 0; i < 3; i += 1) {
    c = Number.parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += `00${c}`.substr(c.length);
  }
  return rgb;
}
export function getClassTicket(ticket: string) {
  const BDR_CLASS = ['31', '33', '34', '35', '39'];

  const ACAO_CLASS = {
    fraction: ['1F', '3F', '4F', '5F', '6F'],
    integer: ['3', '4', '5', '6'],
  };

  return BDR_CLASS.includes(ticket.slice(-2))
    ? 'BDR'
    : ACAO_CLASS.fraction.includes(ticket.slice(-2)) ||
        ACAO_CLASS.integer.includes(ticket.slice(-1)) ||
        isUnit(ticket)
      ? 'Ação'
      : ticket.slice(-2) === '11' && !isUnit(ticket) && !isETF(ticket)
        ? 'FII'
        : isETF(ticket)
          ? 'ETF'
          : isCripto(ticket)
            ? 'Cripto'
            : 'Outros';
}
export function getSumByUnicProp(array: any[], key: string, value: string) {
  const unicKeysWithValue = [
    ...new Set(array.filter((item) => !!item[value]).map((item) => item[key])),
  ];

  const sumByProp = unicKeysWithValue.map((unic, index) => ({
    _id: unic,
    [key]: unic,
    [value]: array
      .filter((item) => item[key] === unic)
      .reduce((acc, cur) => acc + cur[value], 0),
    color: array[index].color,
  }));

  return sumByProp;
}
export function getTranslateSector(sector: string) {
  return {
    [sector]: sector,
    Financial: 'Financeiro',
    Healthcare: 'Saúde',
    'Real Estate': 'Imobiliário',
    'Property Management': 'Imobiliário',
    'Financial Services': 'Financeiro',
    Utilities: 'Utilidades Pública',
    'Communication Services': 'Serviços de Comunicação',
    'Consumer Cyclical': 'Consumo Ciclico',
    'REIT - Industrial': 'Industrial',
    'REIT—Industrial': 'Industrial',
    'REIT—Office': 'Hibrido',
    'Medical Instruments & Supplies': 'Medicina Diagnóstica',
    'Diagnostics & Research': 'Medicina Diagnóstica',
    'REIT—Diversified': 'Imobiliário',
    'REIT - Diversified': 'Imobiliário',
    'REIT - Retail': 'Varejo',
    'REIT—Retail': 'Varejo',
    'Real Estate—Development': 'Imobiliário',
    'Insurance—Reinsurance': 'Seguros',
    'Insurance—Diversified': 'Seguros',
    'Insurance Brokers': 'Seguros',
    'Insurance—Property & Casualty': 'Seguros',
    'Utilities—Regulated Electric': 'Elétrico',
    'Internet Content & Information': 'Programas e Serviços',
    'Specialty Retail': 'Varejo',
    'Real Estate—Diversified': 'Imobiliário',
    'Department Stores': 'Varejo',
    'Other Industrial Metals & Mining': 'Mineração',
    'Basic Materials': 'Materiais Básicos',
    'Oil & Gas Integrated': 'Petróleo, Gás e Biocombustíveis',
    'Oil & Gas E&P': 'Petróleo, Gás e Biocombustíveis',
    'Oil & Gas Refining & Marketing': 'Petróleo, Gás e Biocombustíveis',
    Energy: 'Energia',
    'Utilities—Regulated Water': 'Saneamento',
    'Pharmaceutical Retailers': 'Produtos Farmacêuticos',
    'Telecom Services': 'Serviços de Comunicação',
    'Banks—Regional': 'Bancário',
    'Banks—Diversified': 'Bancário',
    'Rental & Leasing Services': 'Locação de Veículos',
    Industrials: 'Industrial',
    'Packaged Foods': 'Alimentos',
    'Food Distribution': 'Alimentos',
    'Consumer Defensive': 'Consumo Não ciclico',
    'Luxury Goods': 'Artigos de Luxo',
    Airlines: 'Aéreo',
    'Travel Services': 'Turismo',
    'Apparel Manufacturing': 'Vestuário',
    'Apparel Retail': 'Vestuário',
    Chemicals: 'Químico',
    'Financial Data & Stock Exchanges': 'Bolsa de Valores',
    'Household & Personal Products': 'Varejo',
    'Real Estate Services': 'Imobiliário',
    'Utilities—Diversified': 'Elétrico',
    'Utilities—Renewable': 'Elétrico',
    'Residential Construction': 'Construção',
    Steel: 'Siderúrgico',
    'Asset Management': 'Gestão de ativos',
    'Healthcare Plans': 'Plano de Saúde',
    'Specialty Industrial Machinery': 'Máquinas e Motores',
    'Industrial Distribution': 'Máquinas e Motores',
    Technology: 'Tecnologia',
    'Information Technology Services': 'Tecnologia',
    'Software—Infrastructure': 'Tecnologia',
    'Software—Application': 'Tecnologia',
    'Credit Services': 'Tecnologia',
    'Farm Products': 'Agricultura',
    'Internet Retail': 'Varejo',
    'Education & Training Services': 'Educação',
    'Footwear & Accessories': 'Calçados',
    'Integrated Freight & Logistics': 'Transporte',
    Entertainment: 'Entretenimento',
    'Consumer Electronics': 'Varejo',
    'Money Center Banks': 'Bancário',
    'Paper & Paper Products': 'Papel e Celulose',
    'Packaging & Containers': 'Papel e Celulose',
    'Drug Manufacturers—Specialty & Generic': 'Produtos Farmacêuticos',
    'Aerospace & Defense': 'Material Aéreo e de Defesa',
    'Capital Markets': 'Corretoras',
    'Auto Manufacturers': 'Material Rodoviário',
    'Beverages—Brewers': 'Bebidas',
    'Marine Shipping': 'Portuário',
    'Medical Care Facilities': 'Plano de Saúde',
    Restaurants: 'Alimentos',
    'Personal Services': 'Serviços Pessoais',
    Gold: 'Mineração',
    'Farm & Heavy Construction Machinery': 'Máquinas e Motores',
    'Beverages—Non-Alcoholic': 'Bebidas',
    'Agricultural Inputs': 'Agricultura',
    'Auto Parts': 'Material Automotivo',
    'Building Products & Equipment': 'Construção',
    Railroads: 'Transporte',
    'Engineering & Construction': 'Construção',
    'Electronics & Computer Distribution': 'Tecnologia',
    Confectioners: 'Alimentos',
    'Infrastructure Operations': 'Transporte',
    Trucking: 'Transporte',
    'Waste Management': 'Gestão de Resíduos',
    'Textile Manufacturing': 'Vestuário',
    'Furnishings, Fixtures & Appliances': 'Eletrodomésticos',
    'Lumber & Wood Production': 'Produção de Madeiras',
    'Grocery Stores': 'Alimentos',
    'REIT—Specialty': 'Imobiliário',
    Tobacco: 'Tabaco',
    'Utilities—Independent Power Producers': 'Elétrico',
    Conglomerates: 'Holding',
    'Electrical Equipment & Parts': 'Máquinas e Motores',
  }[sector];
}
export function formatTicketByFraction(ticket: string) {
  let formatedTicket = ticket;

  if (
    formatedTicket.slice(-5) === '3F.SA' ||
    formatedTicket.slice(-5) === '4F.SA' ||
    formatedTicket.slice(-5) === '5F.SA' ||
    formatedTicket.slice(-5) === '6F.SA' ||
    formatedTicket.slice(-6) === '11F.SA'
  ) {
    formatedTicket = formatedTicket.replace('F.SA', '.SA').trim();
  }

  return formatedTicket;
}
