import { model, Schema } from 'mongoose';
import { env } from '../services/env';

const { RFT_EXPIRE } = env;

const expireSeconds = new Date().setSeconds(
  new Date().getSeconds() + Number(RFT_EXPIRE)
);

const RefreshTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiresIn: {
    type: Number,
    default: expireSeconds,
  },
  rftoken: {
    type: String,
    required: true,
  },
});

RefreshTokenSchema.index(
  { rftoken: 1 },
  { expireAfterSeconds: Number(RFT_EXPIRE) }
);

export default model('RefreshToken', RefreshTokenSchema);
