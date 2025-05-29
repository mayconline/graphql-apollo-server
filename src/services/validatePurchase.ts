import type {
  IValidatePurchaseRequest,
  IValidatePurchaseResponse,
} from '../types';
import apiValidatePurchase from './apiValidatePurchase';

export const validatePurchase = async (purchase: IValidatePurchaseRequest) => {
  try {
    const response = await apiValidatePurchase.post<IValidatePurchaseResponse>(
      '/iap/validate-purchase',
      purchase,
    );

    return response;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.error || 'Error validating purchase',
    );
  }
};
