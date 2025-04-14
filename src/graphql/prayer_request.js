import { gql } from "@apollo/client";

export const GET_PRAYER_REQUESTS = gql`
  query AllPrayerRequests {
    allPrayerRequests {
      id
      first_name
      last_name
      full_name
      phone
      email
      gender
      age
      prayer_issue
      other_prayer_issue
      address
      prayer_issue_description
      createdAt
    }
  }
`;

export const CREATE_PRAYER_REQUEST = gql`
  mutation CreatePrayerRequest($input: CreatePrayerRequestInput) {
    createPrayerRequest(input: $input) {
      id
    }
  }
`;

export const UPDATE_PRAYER_REQUEST = gql`
  mutation UpdatePrayerRequest(
    $updatePrayerRequestId: ID!
    $input: UpdatePrayerRequestInput
  ) {
    updatePrayerRequest(id: $updatePrayerRequestId, input: $input) {
      id
    }
  }
`;

export const DELETE_PRAYER_REQUEST = gql`
  mutation DeletePrayerRequest($id: ID!) {
    deletePrayerRequest(id: $id)
  }
`;
