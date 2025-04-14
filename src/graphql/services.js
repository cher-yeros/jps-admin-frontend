import { gql } from "@apollo/client";

export const GET_SERVICE_CATEGORY = gql`
  query ServiceCategories {
    serviceCategories {
      id
      title
      playlist_link
      createdAt
      updatedAt
      services {
        id
      }
    }
  }
`;
export const GET_SERVICES = gql`
  query Services {
    services {
      id

      youtube_link
      createdAt
      updatedAt
      category {
        id
        title
        playlist_link
        createdAt
      }
    }
  }
`;

export const CREATE_SERVICE_CATEGORY = gql`
  mutation CreateServiceCategory($input: CreateServiceCategoryInput) {
    createServiceCategory(input: $input) {
      id
    }
  }
`;
export const CREATE_SERVICE = gql`
  mutation CreateService($input: CreateServiceInput) {
    createService(input: $input) {
      id
    }
  }
`;

export const UPDATE_SERVICE_CATEGORY = gql`
  mutation UpdateServiceCategory($input: UpdateServiceCategoryInput) {
    updateServiceCategory(input: $input)
  }
`;
export const UPDATE_SERVICE = gql`
  mutation UpdateService($input: UpdateServiceInput) {
    updateService(input: $input)
  }
`;

export const DELETE_SERVICE_CATEGORY = gql`
  mutation DeleteServiceCategory($id: Int!) {
    deleteServiceCategory(id: $id)
  }
`;
export const DELETE_SERVICE = gql`
  mutation DeleteService($id: Int!) {
    deleteService(id: $id)
  }
`;

export const GET_SERVICES_FOR_USERS = gql`
  query ServiceCategoryForUsers {
    serviceCategoryForUsers {
      id
      title
      playlist_link
      createdAt
      updatedAt
      services {
        id
        youtube_link
        createdAt
      }
    }
  }
`;
