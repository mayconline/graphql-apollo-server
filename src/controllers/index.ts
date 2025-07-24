import finance from '../services/finance';
import AuthController from './AuthController';
import EarningController from './EarningController';
import FinanceController from './FinanceController';
import QuestionController from './QuestionController';
import RecoveryPasswordController from './RecoveryPasswordController';
import RefreshTokenController from './RefreshToken';
import ReportsController from './ReportsController';
import TicketController from './TicketController';
import UserController from './UserController';
import ValidatePurchaseController from './ValidatePurchaseController';
import WalletController from './WalletController';

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
  ValidatePurchaseController,
};
