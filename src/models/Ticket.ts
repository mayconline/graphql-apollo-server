import { Schema, model } from 'mongoose';

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

export default model('Ticket', TicketSchema);
