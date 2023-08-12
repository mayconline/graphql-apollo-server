import AuthController from './AuthController';
import RecoveryPasswordController from './RecoveryPasswordController';
import UserController from './UserController';
import WalletController from './WalletController';
import TicketController from './TicketController';
import FinanceController from './FinanceController';
import QuestionController from './QuestionController';
import ReportsController from './ReportsController';
import EarningController from './EarningController';
import RefreshTokenController from './RefreshToken';
import finance from '../services/finance';

export const dataSources = {
  finance,
  AuthController,
  RecoveryPasswordController,
  UserController,
  WalletController,
  TicketController,
  FinanceController,
  QuestionController,
  ReportsController,
  EarningController,
  RefreshTokenController,
};
