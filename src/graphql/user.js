import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput) {
    createUser(input: $input) {
      id
      avatar
      firstname
      lastname
      fullname
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
        # fullname
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
  query VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

// export const LOGIN_USER = gql`
//   mutation LoginUser($input: LoginInput) {
//     loginUser(input: $input) {
//       token
//       user {
//         id
//         avatar
//         firstname
//         lastname
//         username
//         gender
//         bio
//         phone
//         email
//         address
//         portfolio_dir
//         role
//       }
//     }
//   }
// `;
