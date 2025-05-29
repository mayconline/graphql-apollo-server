import { validatePurchase } from '../services/validatePurchase';
import type { IValidatePurchaseControllerArgs } from '../types';

export default {
  validate: async (args: IValidatePurchaseControllerArgs) => {
    try {
      const { data: response } = await validatePurchase(args.input);

      const validateData = {
        transactionDate: response?.data?.startTimeMillis,
        renewDate: response?.data?.expiryTimeMillis,
        productId: response?.data?.productId,
        packageName: response?.data?.packageName,
        orderId: response?.data?.orderId,
        purchaseToken: response?.data?.purchaseToken,
        platform: response?.data?.platform,
        autoRenewing: response?.data?.autoRenewing,
      };

      return validateData;
    } catch (error: any) {
      throw new Error(error || 'Error validating purchase');
    }
  },
};
