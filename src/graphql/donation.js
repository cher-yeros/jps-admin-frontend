import { gql } from "@apollo/client";

export const CREATE_DONATION = gql`
  mutation CreateDonation($input: CreateDonationInput) {
    createDonation(input: $input) {
      message
      status
      data {
        checkout_url
      }
    }
  }
`;

export const GET_DONATIONS = gql`
  query AllDonations {
    allDonations {
      id
      first_name
      last_name
      full_name
      phone
      email
      amount
      payment_method
      currency
      additional_message
      createdAt
      updatedAt
      payment {
        id
        first_name
        last_name
        full_name
        phone
        email
        payment_method
        reason
        amount
        currency
        status
        tx_ref
        createdAt
        updatedAt
      }
    }
  }
`;
