import { Types } from 'mongoose';

export interface IAuthControllerArgs {
  input: {
    _id: string;
    email: string;
    password: string;
    active: boolean;
    checkTerms: boolean;
    role: string;
    plan: {
      transactionDate: number;
      renewDate: number;
      description: string;
      localizedPrice: string;
      productId: string;
      subscriptionPeriodAndroid: string;
      packageName: string;
      transactionId: string;
    };
  };
}

export interface IRecoveryPasswordSendControllerArgs {
  input: {
    email: string;
  };
}

export interface IRecoveryPasswordResetControllerArgs {
  input: {
    email: string;
    code: string;
    password: string;
  };
}

export interface ITokenProps {
  _id: Types.ObjectId;
  role: 'USER' | 'PREMIUM' | 'ADM';
}

export interface IRefreshControllerArgs {
  input: {
    refreshToken: string;
  };
}

export enum ERROR_CODE {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  FORBIDDEN = 'FORBIDDEN',
  API_ERROR = 'API_ERROR',
}

export interface IEarningQueryControllerArgs {
  walletID: string;
  year: number;
}

export interface IEarningMutationControllerArgs {
  _id: string;
  walletID: string;
  input: {
    year: number;
    month: number;
    amount: number;
  };
}

export interface IFinanceControllerArgs {
  _id: string;
  symbol: string;
  longName: string;
  quantity: number;
  averagePrice: number;
  regularMarketPrice: number;
  financialCurrency: string;
  grade: number;
}

export enum SORT_RENTABILITY {
  symbol = 'symbol',
  costAmount = 'costAmount',
  currentAmount = 'currentAmount',
  variationPercent = 'variationPercent',
}

export interface IRentabilityResponseProps {
  _id: string;
  symbol: string;
  longName: string;
  sumCostWallet: number;
  sumAmountWallet: number;
  costAmount: number;
  currentAmount: number;
  variationAmount: number;
  variationPercent: number;
  financialCurrency: string;
}

export enum SORT_REBALANCE {
  symbol = 'symbol',
  status = 'status',
  currentAmount = 'currentAmount',
  targetAmount = 'targetAmount',
  currentPercent = 'currentPercent',
  targetPercent = 'targetPercent',
  gradePercent = 'gradePercent',
}

export interface IRebalanceResponseProps {
  _id: string;
  symbol: string;
  longName: string;
  status: 'BUY' | 'KEEP' | 'ANALYZE';
  currentAmount: number;
  gradePercent: number;
  currentPercent: number;
  targetPercent: number;
  targetAmount: number;
  financialCurrency: string;
}

export interface IQuestionControllerArgs {
  input: {
    ask: string;
    answer: string;
  };
}
