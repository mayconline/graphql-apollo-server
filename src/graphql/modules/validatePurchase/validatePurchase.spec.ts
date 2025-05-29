import { gql, executeOperation } from '../../../mocks/serverMock';

describe('ValidatePurchase', () => {
  const VALIDATE_PURCHASE = gql`
    mutation validatePurchase(
      $platform: Platform!
      $packageName: String!
      $productId: String!
      $purchaseToken: String!
      $subscription: Boolean!
    ) {
      validatePurchase(
        input: {
          platform: $platform
          receipt: {
            packageName: $packageName
            productId: $productId
            purchaseToken: $purchaseToken
            subscription: $subscription
          }
        }
      ) {
        autoRenewing
        orderId
        packageName
        platform
        productId
        purchaseToken
        renewDate
        transactionDate
      }
    }
  `;

  describe('Mutations', () => {
    it('should validate purchase', async () => {
      const res = await executeOperation(VALIDATE_PURCHASE, {
        platform: 'ANDROID',
        packageName: 'test',
        productId: 'test',
        purchaseToken: 'test',
        subscription: true,
      });

      const bodyData = res.body.singleResult.data;
      expect(bodyData).toHaveProperty('validatePurchase');
      expect(bodyData.validatePurchase).toHaveProperty('autoRenewing');
      expect(bodyData.validatePurchase).toHaveProperty('orderId');
      expect(bodyData.validatePurchase).toHaveProperty('packageName');
      expect(bodyData.validatePurchase).toHaveProperty('platform');
      expect(bodyData.validatePurchase).toHaveProperty('productId');
      expect(bodyData.validatePurchase).toHaveProperty('purchaseToken');
      expect(bodyData.validatePurchase).toHaveProperty('renewDate');
      expect(bodyData.validatePurchase).toHaveProperty('transactionDate');
    });
  });

  describe('Error Cases', () => {
    it('should handle invalid input at validate purchase', async () => {
      const res = await executeOperation(VALIDATE_PURCHASE, {
        invalidData: 'test',
      });

      expect(res?.body?.singleResult?.errors).toBeDefined();
      expect(res?.body?.singleResult?.errors?.[0]?.message).toContain(
        'Variable "$platform" of required type "Platform!" was not provided.',
      );
    });
  });
});
