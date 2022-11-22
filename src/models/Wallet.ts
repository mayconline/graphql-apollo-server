import { Schema, model } from 'mongoose';

const WalletSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
    },
    ticket: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
      },
    ],
    earning: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Earning',
      },
    ],
  },
  { timestamps: true },
);

export default model('Wallet', WalletSchema);
