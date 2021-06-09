const { Schema, model } = require('mongoose');

const TicketSchema = new Schema(
  {
    symbol: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    averagePrice: {
      type: Number,
      required: true,
      default: 0,
    },
    grade: {
      type: Number,
      required: true,
      default: 0,
    },
    classSymbol: {
      type: String,
      default: 'Outros',
    },
  },
  { timestamps: true },
);

module.exports = model('Ticket', TicketSchema);
