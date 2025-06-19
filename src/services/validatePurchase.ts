import type {
  IValidatePurchaseRequest,
  IValidatePurchaseResponse,
} from '../types';
import apiValidatePurchase from './apiValidatePurchase';

export const validatePurchase = async (
  purchase: IValidatePurchaseRequest,
  authToken: string,
) => {
  try {
    const response = await apiValidatePurchase.post<IValidatePurchaseResponse>(
      '/api/validate-purchase',
      purchase,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.error || 'Error validating purchase',
    );
  }
};
