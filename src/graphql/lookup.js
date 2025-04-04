import { gql } from "@apollo/client";

export const GET_TEACHING_CATEOGORYS = gql`
  query GetTeachingCategories {
    getTeachingCategories {
      id
      title
      picture
      description
      createdAt
      updatedAt
    }
  }
`;

export const GET_PACKAGES = gql`
  query GetPackages {
    getPackages {
      id
      name
    }
  }
`;
