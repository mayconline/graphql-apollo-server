const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    checkTerms: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['USER', 'PREMIUM', 'ADM'],
      default: 'USER',
    },
    plan: {
      transactionDate: { type: Number },
      renewDate: { type: Number },
      description: { type: String },
      localizedPrice: { type: String },
      productId: { type: String },
      subscriptionPeriodAndroid: { type: String },
      packageName: { type: String },
      transactionId: { type: String },
    },
  },
  { timestamps: true },
);

module.exports = model('User', UserSchema);
