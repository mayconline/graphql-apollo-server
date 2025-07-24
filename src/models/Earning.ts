import { model, Schema } from 'mongoose';

const EarningSchema = new Schema(
  {
    year: {
      type: Number,
      required: true,
      default: new Date().getFullYear(),
    },
    month: {
      type: Number,
      required: true,
      default: new Date().getMonth() + 1,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model('Earning', EarningSchema);
