import { mergeResolvers } from '@graphql-tools/merge';

import authResolvers from './modules/authenticate/resolvers';
import earningResolvers from './modules/earnings/resolvers';
import financeResolvers from './modules/finance/resolvers';
import helpResolvers from './modules/help/resolvers';
import rebalanceResolvers from './modules/rebalance/resolvers';
import recoveryResolvers from './modules/recovery/resolvers';
import refreshTokenResolvers from './modules/refreshToken/resolvers';
import rentabilityResolvers from './modules/rentability/resolvers';
import reportsResolvers from './modules/reports/resolvers';
import ticketsResolvers from './modules/tickets/resolvers';
import usersResolvers from './modules/users/resolvers';
import walletsResolvers from './modules/wallets/resolvers';

const resolvers = mergeResolvers([
  authResolvers,
  earningResolvers,
  financeResolvers,
  helpResolvers,
  rebalanceResolvers,
  recoveryResolvers,
  refreshTokenResolvers,
  rentabilityResolvers,
  reportsResolvers,
  ticketsResolvers,
  usersResolvers,
  walletsResolvers,
]);

export default resolvers;
