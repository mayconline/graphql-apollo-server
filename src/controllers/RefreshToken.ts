import { Types } from 'mongoose';
import RefreshTokenSchema from '../models/RefreshToken';
import { setToken } from '../utils/shareFunc';
import { randomUUID } from 'node:crypto';

const show = async (userID: Types.ObjectId) => {
  const refreshToken = await RefreshTokenSchema.findOne({
    user: userID,
  }).lean();

  return refreshToken;
};

const store = async (userID: Types.ObjectId, role: string) => {
  const oldRefreshToken = await show(userID);

  if (!!oldRefreshToken) {
    await destroy(oldRefreshToken._id);
  }

  const cryptoBytes = randomUUID();

  const refreshToken = await RefreshTokenSchema.create({
    user: userID,
    rftoken: cryptoBytes,
  });

  const newToken = await setToken(userID, role);

  return {
    token: newToken,
    refreshToken: refreshToken.rftoken,
  };
};

const update = async (args: any) => {
  const getRefreshToken = await RefreshTokenSchema.findOne({
    rftoken: args.input.refreshToken,
  })
    .populate({ path: 'user', select: 'role' })
    .lean();

  if (!getRefreshToken) throw new Error('Refresh Token Invalid or Expired');

  const { expiresIn, user } = getRefreshToken as any;

  const hasExpiredToken = expiresIn < Date.now();

  if (hasExpiredToken) throw new Error('Refresh Token Invalid or Expired');

  return await store(user._id, user.role);
};

const destroy = async (refreshTokenID: Types.ObjectId) => {
  await RefreshTokenSchema.deleteOne(refreshTokenID);
};

export default { show, store, update, destroy };
