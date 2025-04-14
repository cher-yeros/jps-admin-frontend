import { gql } from "@apollo/client";

export const CREATE_PARTNERSHIP = gql`
  mutation CreatePartnership($input: CreatePartnershipInput) {
    createPartnership(input: $input) {
      message
      status
      data {
        checkout_url
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreatePartnershipInput) {
    createOrder(input: $input)
  }
`;

export const CAPTURE_ORDER = gql`
  mutation CaptureOrder($orderId: String!) {
    captureOrder(orderID: $orderId)
  }
`;

export const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription($input: CreatePartnershipInput) {
    createSubscription(input: $input)
  }
`;

export const CAPTURE_SUBSCRIPTION = gql`
  mutation CaptureSubscription($orderId: String!) {
    captureSubscription(orderID: $orderId)
  }
`;

export const GET_PARTNERS = gql`
  query Partnerships {
    partners {
      id
      first_name
      last_name
      full_name
      phone
      email
      partnership_type
      partnership_plan
      amount
      payment_method
      additional_message

      createdAt
      updatedAt
    }
  }
`;

export const ADD_NEW_PARTNER = gql`
  mutation AddNewPartner($input: CreatePartnershipInput) {
    addNewPartner(input: $input) {
      id
    }
  }
`;
