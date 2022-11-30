import { Schema, model } from 'mongoose';
const { RFT_EXPIRE } = process.env;

const expireSeconds = new Date().setSeconds(
  new Date().getSeconds() + Number(RFT_EXPIRE),
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
  { expireAfterSeconds: Number(RFT_EXPIRE), unique: true },
);

export default model('RefreshToken', RefreshTokenSchema);
