const { tickets } = require('./mocks/dataMock');

module.exports = {
  getTicketsArray: wallet =>
    wallet.ticket.map(ticketID =>
      tickets.find(ticket => ticket._id === ticketID),
    ),
};
