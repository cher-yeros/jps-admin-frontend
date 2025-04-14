import { gql } from "@apollo/client";

export const DASHBOARD_STATS = gql`
  query Query {
    stats
  }
`;

export const GET_PAYMENTS = gql`
  query Payments {
    payments {
      id
      first_name
      last_name
      full_name
      phone
      email
      reason
      amount
      tx_ref
      status
      payment_method
      createdAt
      updatedAt
    }
  }
`;

export const GET_FEEDBACKS = gql`
  query Feedbacks {
    feedbacks {
      id
      name
      phone
      email
      subject
      message
      createdAt
      updatedAt
    }
  }
`;
