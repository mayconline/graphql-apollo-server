import { randomUUID } from 'node:crypto';
import { Types } from 'mongoose';
import RefreshTokenSchema from '../models/RefreshToken';
import { setToken } from '../utils/shareFunc';

const show = async (userID: Types.ObjectId) => {
  try {
    const refreshToken = await RefreshTokenSchema.findOne({
      user: userID,
    }).lean();

    return refreshToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const destroy = async (refreshTokenID: Types.ObjectId) => {
  try {
    await RefreshTokenSchema.deleteOne(refreshTokenID);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const store = async (userID: Types.ObjectId, role: string) => {
  try {
    const oldRefreshToken = await show(userID);

    if (oldRefreshToken) {
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
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const update = async (args: any) => {
  try {
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
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default { show, store, update, destroy };
