import { Types } from 'mongoose';
import RefreshTokenSchema from '../models/RefreshToken';
import { setToken } from '../utils/shareFunc';

const show = async (identityID: Types.ObjectId) => {
  const refreshToken = await RefreshTokenSchema.find({
    $or: [{ user: identityID }, { _id: identityID }],
  })
    .populate({ path: 'user', select: 'role' })
    .lean();

  if (!refreshToken.length) return null;

  return refreshToken[0];
};

const store = async (userID: Types.ObjectId, role: string) => {
  const hasExistsToken = await RefreshTokenSchema.find({ user: userID });

  if (!!hasExistsToken.length) {
    await destroy(hasExistsToken[0]._id);
  }

  const refreshToken = await RefreshTokenSchema.create({
    user: userID,
  });

  const newToken = await setToken(userID, role);

  return {
    token: newToken,
    refreshToken: String(refreshToken._id),
  };
};

const update = async (args: any) => {
  const getRefreshToken = await RefreshTokenSchema.findById(
    args.input.refreshToken,
  )
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
