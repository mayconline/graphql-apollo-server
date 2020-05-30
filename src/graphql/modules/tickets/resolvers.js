const { tickets } = require('../../../mocks');

module.exports = {
  Query: {
    tickets: () => tickets,
  },
};
