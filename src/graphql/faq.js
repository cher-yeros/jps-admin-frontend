import { gql } from "@apollo/client";

export const GET_FAQS = gql`
  query AllFAQs {
    allFAQs {
      id
      question
      answer
      createdAt
    }
  }
`;

export const GET_FAQS_FOR_USERS = gql`
  query AllFAQsForUsers {
    allFAQsForUsers {
      question
      answer
      createdAt
      id
    }
  }
`;

export const CREATE_FAQ = gql`
  mutation CreateFAQ($input: CreateFAQInput) {
    createFAQ(input: $input) {
      id
    }
  }
`;

export const UPDATE_FAQ = gql`
  mutation UpdateFAQ($updateFaqId: ID!, $input: UpdateFAQInput) {
    updateFAQ(id: $updateFaqId, input: $input) {
      id
    }
  }
`;

export const DELETE_FAQ = gql`
  mutation DeleteFAQ($id: ID!) {
    deleteFAQ(id: $id)
  }
`;
