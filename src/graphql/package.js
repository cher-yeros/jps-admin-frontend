import { gql } from "@apollo/client";

export const GET_ALL_PACKAGES = gql`
  query GetPackages {
    getPackages {
      id
      picture
      name
      description
      features
      price_etb
      price_usd
      rating
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PACKAGE = gql`
  mutation CreatePackage($input: CreatePackageInput!) {
    createPackage(input: $input) {
      name
    }
  }
`;

export const UPDATE_PACKAGE = gql`
  mutation UpdatePackage($updatePackageId: ID!, $input: UpdatePackageInput!) {
    updatePackage(id: $updatePackageId, input: $input) {
      name
    }
  }
`;

export const DELETE_PACKAGE = gql`
  mutation DeletePackage($id: ID!) {
    deletePackage(id: $id)
  }
`;
