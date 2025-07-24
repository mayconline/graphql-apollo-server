import { model, Schema } from 'mongoose';

const RecoveryPasswordSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

RecoveryPasswordSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export default model('RecoveryPassword', RecoveryPasswordSchema);
