import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum Platform {
    ANDROID
    IOS
  }

  input ReceiptRequest {
    packageName: String!
    productId: String!
    purchaseToken: String!
    subscription: Boolean!
  }

  input ValidatePurchaseInput {
    platform: Platform!
    receipt: ReceiptRequest!
  }

  type ValidatePurchaseResponse {
    transactionDate: Float
    renewDate: Float
    productId: String
    packageName: String
    orderId: String
    purchaseToken: String
    platform: Platform
    autoRenewing: Boolean
  }

  type Mutation {
    validatePurchase(input: ValidatePurchaseInput!): ValidatePurchaseResponse!
  }
`;
