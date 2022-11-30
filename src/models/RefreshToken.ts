import { Schema, model } from 'mongoose';

const RefreshTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiresIn: {
    type: Number,
    default: new Date().setDate(new Date().getDate() + 30),
  },
});

export default model('RefreshToken', RefreshTokenSchema);
