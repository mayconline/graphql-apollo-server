import { mergeTypeDefs } from '@graphql-tools/merge';

import { typeDefs as authTypeDefs } from './modules/authenticate/schema';
import { typeDefs as earningsTypeDefs } from './modules/earnings/schema';
import { typeDefs as financeTypeDefs } from './modules/finance/schema';
import { typeDefs as helpTypeDefs } from './modules/help/schema';
import { typeDefs as rebalanceTypeDefs } from './modules/rebalance/schema';
import { typeDefs as recoveryTypeDefs } from './modules/recovery/schema';
import { typeDefs as refreshTokenTypeDefs } from './modules/refreshToken/schema';
import { typeDefs as rentabilityTypeDefs } from './modules/rentability/schema';
import { typeDefs as reportsTypeDefs } from './modules/reports/schema';
import { typeDefs as ticketsHistoryTypeDefs } from './modules/tickets/schema';
import { typeDefs as ticketsTypeDefs } from './modules/users/schema';
import { typeDefs as walletsTypeDefs } from './modules/wallets/schema';

const typeDefs = mergeTypeDefs([
  authTypeDefs,
  earningsTypeDefs,
  financeTypeDefs,
  helpTypeDefs,
  rebalanceTypeDefs,
  recoveryTypeDefs,
  refreshTokenTypeDefs,
  rentabilityTypeDefs,
  reportsTypeDefs,
  ticketsHistoryTypeDefs,
  ticketsTypeDefs,
  walletsTypeDefs,
]);

export default typeDefs;
