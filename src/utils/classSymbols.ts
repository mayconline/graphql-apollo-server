const unitsTickets = [
  'ALUP11',
  'BRBI11',
  'BIDI11',
  'BPAC11',
  'ENGI11',
  'KLBN11',
  'PPLA11',
  'RNEW11',
  'SAPR11',
  'SANB11',
  'SULA11',
  'TAEE11',
  'CPLE11',
  'MODL11',
  'IGTI11',
  'RBNS11',
];
const etfTickets = [
  'BBOV11',
  'BOVX11',
  'BBSD11',
  'IBOB11',
  'ESGB11',
  'XBOV11',
  'BOVB11',
  'SMAL11',
  'BOVA11',
  'BRAX11',
  'GENB11',
  'ECOO11',
  'IVVB11',
  'BOVV11',
  'DIVO11',
  'FIND11',
  'GOVE11',
  'MATB11',
  'ISUS11',
  'PIBB11',
  'SPXI11',
  'SMAC11',
  'XFIX11',
  'USTK11',
  'GOLD11',
  'XINA11',
  'HASH11',
  'QBTC11',
  'EURP11',
  'NASD11',
  'TECK11',
  'SAET11',
  'HTEK11',
  'DNAI11',
  'MILL11',
  'REVE11',
  'SHOT11',
  'QETH11',
  'ACWI11',
  'ASIA11',
  'EMEG11',
  'XMAL11',
  'BITH11',
  'TECB11',
  'ALUG11',
  'NDIV11',
  'NSDV11',
  'WRLD11',
  'CORN11',
  'AGRI11',
  'BBOI11',
  'BMMT11',
  'BREW11',
  'BDEF11',
  'SPXB11',
  'SMAB11',
  'CMDB11',
  'CRPT11',
  'TRIG11',
  'META11',
  'DEFI11',
  'ETHE11',
  'WEB311',
  'GURU11',
  'PEVC11',
  '5GTK11',
  'JOGO11',
  'FOOD11',
  'SVAL11',
  'BDOM11',
  'BXPO11',
  'SCBV11',
  'BTEK11',
  'BLOK11',
  'NFTS11',
  'BITI11',
  'YDRO11',
  'BCIC11',
  'QDFI11',
  'ELAS11',
  'BOVS11',
  'USAL11',
  'URET11',
  'ESGD11',
  'ESGE11',
  'UTEC11',
  'ESGU11',
  'SPYI11',
];
const criptoTickets = [
  'BTC-USD',
  'ETH-USD',
  'ADA-USD',
  'BNB-USD',
  'USDT-USD',
  'SOL1-USD',
  'XRP-USD',
  'USDC-USD',
  'DOT1-USD',
  'SHIB-USD',
  'DOGE-USD',
  'LUNA1-USD',
  'UNI3-USD',
  'LTC-USD',
  'BCH-USD',
  'XLM-USD',
  'XMR-USD',
];

export const isUnit = (symbol: string) =>
  unitsTickets.includes(symbol.toUpperCase());

export const isETF = (symbol: string) =>
  etfTickets.includes(symbol.toUpperCase());

export const isCripto = (symbol: string) =>
  criptoTickets.includes(symbol.toUpperCase());
