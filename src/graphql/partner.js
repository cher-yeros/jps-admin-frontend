import { gql } from "@apollo/client";

export const GET_ALL_PARTNERS = gql`
  query GetPartners {
    getPartners {
      id
      first_name
      last_name
      full_name
      phone
      email
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PARTNER = gql`
  mutation CreatePartner($input: CreatePartnerInput!) {
    createPartner(input: $input) {
      message
      status
      data {
        checkout_url
      }
    }
  }
`;

export const UPDATE_PARTNER = gql`
  mutation UpdatePartner($updatePartnerId: ID!, $input: UpdatePartnerInput!) {
    updatePartner(id: $updatePartnerId, input: $input) {
      first_name
    }
  }
`;

export const DELETE_PARTNER = gql`
  mutation DeletePartner($id: ID!) {
    deletePartner(id: $id)
  }
`;
