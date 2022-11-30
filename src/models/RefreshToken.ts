import { Schema, model } from 'mongoose';

const expireDays = new Date().setDate(
  new Date().getDate() + Number(process.env.RFT_EXPIRE),
);

const RefreshTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiresIn: {
    type: Number,
    default: expireDays,
  },
});

export default model('RefreshToken', RefreshTokenSchema);
