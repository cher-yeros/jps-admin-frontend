import { gql } from "@apollo/client";

export const ORDER_BOOK = gql`
  mutation ChapaBookPurchase($input: CreateBookPurchaseInput) {
    chapaBookPurchase(input: $input) {
      message
      status
      data {
        checkout_url
      }
    }
  }
`;

export const CREATE_BOOK_ORDER = gql`
  mutation CreateBookPurchaseOrder($input: CreateBookPurchaseInput) {
    createBookPurchaseOrder(input: $input)
  }
`;

export const CAPTURE_BOOK_ORDER = gql`
  mutation CaptureBookPurchaseOrder($orderId: String!) {
    captureBookPurchaseOrder(orderID: $orderId)
  }
`;
