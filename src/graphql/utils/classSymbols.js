module.exports = {
  UnitsTickets: [
    'TIET11',
    'ALUP11',
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
  ],
  ETFTickets: [
    'BBOV11',
    'BBSD11',
    'ESGB11',
    'XBOV11',
    'BOVB11',
    'SMAL11',
    'BOVA11',
    'BRAX11',
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
    'GOLD11',
    'XINA11',
    'HASH11',
    'QBTC11',
    'EURP11',
    'NASD11',
    'TECK11',
    'SAET11',
    'HTEK11',
  ],
  isUnit: symbol => module.exports.UnitsTickets.includes(symbol.toUpperCase()),
  isETF: symbol => module.exports.ETFTickets.includes(symbol.toUpperCase()),
};
