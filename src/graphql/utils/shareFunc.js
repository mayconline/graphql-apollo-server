import { sign, verify } from 'jsonwebtoken';
import { isUnit, isETF, isCripto } from './classSymbols';

export function getSumGradeWallet(currentArray) {
  return currentArray.reduce((acc, cur) => acc + cur.grade, 0);
}
export function getSumCostWallet(currentArray) {
  return currentArray.reduce(
    (acc, cur) => acc + cur.quantity * cur.averagePrice,
    0,
  );
}
export function getSumAmountWallet(currentArray) {
  return currentArray.reduce(
    (acc, cur) => acc + cur.quantity * cur.regularMarketPrice,
    0,
  );
}
export function getSumAmountEarning(currentArray) {
  return currentArray.reduce((acc, cur) => acc + cur.amount, 0);
}
export function getPercentVariation(SumCost, SumAmount) {
  let calcPercent = ((SumAmount - SumCost) / SumCost || 1) * 100;

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
export function getArraySortByParams(array, params, inverse = false) {
  return array.sort((a, b) => {
    let itema = a[params];
    let itemb = b[params];

    if (typeof itema === 'number') {
      return inverse ? itema - itemb : itemb - itema;
    } else {
      if (itemb < itema) return 1;
      if (itemb > itema) return -1;
      return 0;
    }
  });
}
export async function setToken(_id, role) {
  return sign({ _id, role }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}
export function getToken({ headers }) {
  const { authorization } = headers;
  if (!authorization) return null;

  const token = authorization.replace('Bearer', '').trim();

  try {
    const decoded = verify(token, process.env.JWT_TOKEN);
    return decoded;
  } catch {
    throw new Error('Token Invalid or Expired');
  }
}
export function formatSymbol(symbol) {
  return symbol.toUpperCase().replace('.SA', '').trim();
}
export function getRandomDarkColor() {
  var lum = -0.25;
  var hex = String(
    '#' + Math.random().toString(16).slice(2, 8).toUpperCase(),
  ).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  var rgb = '#',
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }
  return rgb;
}
export function getClassTicket(ticket) {
  return ticket.slice(-2) === '31' ||
    ticket.slice(-2) === '33' ||
    ticket.slice(-2) === '34' ||
    ticket.slice(-2) === '35' ||
    ticket.slice(-2) === '39'
    ? 'BDR'
    : ticket.slice(-2) === '3F' ||
      ticket.slice(-2) === '4F' ||
      ticket.slice(-2) === '5F' ||
      ticket.slice(-2) === '6F' ||
      ticket.slice(-3) === '11F' ||
      ticket.slice(-1) === '3' ||
      ticket.slice(-1) === '4' ||
      ticket.slice(-1) === '5' ||
      ticket.slice(-1) === '6' ||
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
export function getSumByUnicProp(array, key, value) {
  let unicProps = [];

  array.map(item => {
    if (!unicProps.includes(item[key]) && !!item[value]) {
      return unicProps.push(item[key]);
    }
  });

  const sumByProp = unicProps.map((unic, index) => ({
    _id: unic,
    [key]: unic,
    [value]: array
      .filter(item => item[key] === unic)
      .reduce((acc, cur) => acc + cur[value], 0),
    color: array[index].color,
  }));

  return sumByProp;
}
export function getTranslateSector(sector) {
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
  }[sector];
}
export function formatTicketByFraction(ticket) {
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
