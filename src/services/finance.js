const api = require('./axios');

module.exports = {
  getFinance: async (ticket) => {
    const res = await api.get(`quote?symbols=${ticket}.SA`);
    const { result, error } = await res.data.quoteResponse;
    const data = !error ? result : error;

    return data;
  },
};
