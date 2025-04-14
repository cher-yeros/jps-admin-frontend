import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput) {
    createUser(input: $input) {
      id
      avatar
      first_name
      last_name
      full_name
      gender
      phone
      email
      address
      dob
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput) {
    loginUser(input: $input) {
      token
      user {
        id
        avatar
        first_name
        last_name
        # full_name
        role
        gender
        phone
        email
        address
        dob
        # createdAt
      }
    }
  }
`;

export const VERIFY_EMAIL = gql`
  query VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

export const REQUEST_RESET_PASSWORD = gql`
  mutation RequestResetPassword($email: String!) {
    requestResetPassword(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $email: String!
    $resetToken: String!
    $newPassword: String!
  ) {
    resetPassword(
      email: $email
      resetToken: $resetToken
      newPassword: $newPassword
    )
  }
`;

export const CREATE_FEEDBACK = gql`
  mutation CreateFeedback($input: CreateFeedbackInput) {
    createFeedback(input: $input) {
      id
    }
  }
`;
