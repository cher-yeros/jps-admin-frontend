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
