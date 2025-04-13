import { gql } from "@apollo/client";

export const GET_ALL_TEACHINGS = gql`
  query GetAllTeachings {
    getAllTeachings {
      id
      picture
      trailer
      title
      owner
      description
      content_type
      file_url
      seo_tags
      # is_downloadable
      # active
      price_etb
      price_usd
      createdAt
      updatedAt
      category {
        id
        title
        picture
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_TEACHING = gql`
  mutation CreateTeaching($input: CreateTeachingInput!) {
    createTeaching(input: $input) {
      title
    }
  }
`;

export const UPDATE_TEACHING = gql`
  mutation UpdateTeaching($input: UpdateTeachingInput!) {
    updateTeaching(input: $input) {
      title
    }
  }
`;

export const DELETE_TEACHING = gql`
  mutation DeleteTeaching($id: ID!) {
    deleteTeaching(id: $id)
  }
`;

// categories

export const GET_ALL_TEACHING_CATEOGORYS = gql`
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

export const CREATE_TEACHING_CATEOGORY = gql`
  mutation CreateTeachingCategory($input: CreateTeachingCategoryInput!) {
    createTeachingCategory(input: $input) {
      title
    }
  }
`;

export const UPDATE_TEACHING_CATEOGORY = gql`
  mutation UpdateTeachingCategory($input: UpdateTeachingCategoryInput!) {
    updateTeachingCategory(input: $input) {
      title
    }
  }
`;

export const DELETE_TEACHING_CATEOGORY = gql`
  mutation DeleteTeachingCategory($id: ID!) {
    deleteTeachingCategory(id: $id)
  }
`;

// Subscription

export const GET_ALL_TEACHING_SUBSCRIPTIONS = gql`
  query GetTeachingSubscriptions {
    getTeachingSubscriptions {
      id
      status
      start_date
      end_date
      payment {
        amount
        reason
        status
        payment_method
        tx_ref
        currency
      }
      package {
        id

        name
        price_etb
        price_usd
      }
      user {
        first_name
        last_name
        phone
        email
      }
    }
  }
`;
