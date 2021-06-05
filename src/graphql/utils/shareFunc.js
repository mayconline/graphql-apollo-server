const jwt = require('jsonwebtoken');
const { isUnit, isETF } = require('./classSymbols');

module.exports = {
  getSumGradeWallet: currentArray =>
    currentArray.reduce((acc, cur) => acc + cur.grade, 0),

  getSumCostWallet: currentArray =>
    currentArray.reduce((acc, cur) => acc + cur.quantity * cur.averagePrice, 0),

  getSumAmountWallet: currentArray =>
    currentArray.reduce(
      (acc, cur) => acc + cur.quantity * cur.regularMarketPrice,
      0,
    ),

  getPercentVariation: (SumCost, SumAmount) => {
    let calcPercent = ((SumAmount - SumCost) / SumCost) * 100;

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
  },

  getArraySortByParams: (array, params) =>
    array.sort((a, b) => {
      let itema = a[params];
      let itemb = b[params];

      if (typeof itema === 'number') {
        return itemb - itema;
      } else {
        if (itemb < itema) return 1;
        if (itemb > itema) return -1;
        return 0;
      }
    }),

  setToken: async (_id, role) =>
    jwt.sign({ _id, role }, process.env.JWT_TOKEN, {
      expiresIn: process.env.JWT_EXPIRE,
    }),

  getToken: ({ headers }) => {
    const { authorization } = headers;
    if (!authorization) return null;

    const token = authorization.replace('Bearer', '').trim();

    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      return decoded;
    } catch {
      throw new Error('Token Invalid or Expired');
    }
  },
  formatSymbol: symbol => symbol.toLowerCase().replace('.sa', '').trim(),

  getRandomDarkColor: () => {
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
  },
  getClassTicket: ticket =>
    ticket.slice(-2) === '34'
      ? 'BDR'
      : ticket.slice(-1) === '3' || ticket.slice(-1) === '4' || isUnit(ticket)
      ? 'Ação'
      : ticket.slice(-2) === '11' && !isUnit(ticket) && !isETF(ticket)
      ? 'FII'
      : isETF(ticket)
      ? 'ETF'
      : 'Outros',

  getPercentTicketPerClass: array => {
    let unicClass = [];

    array.map(item => {
      if (!unicClass.includes(item.key)) {
        return unicClass.push(item.key);
      }
    });

    const percentTicketByClass = unicClass.map((unic, index) => ({
      _id: unic,
      key: unic,
      value: array
        .filter(item => item.key === unic)
        .reduce((acc, cur) => acc + cur.value, 0),
      color: array[index].color,
    }));

    return percentTicketByClass;
  },
};
