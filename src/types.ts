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

export interface ITokenProps {
  _id: string;
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
