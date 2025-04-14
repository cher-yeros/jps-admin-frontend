import { gql } from "@apollo/client";

export const GET_GALLERY = gql`
  query Galleries {
    galleries {
      id
      title
      images
      city
      createdAt
      updatedAt
      category {
        id
        title
        createdAt
      }
    }
  }
`;

export const CREATE_GALLERY = gql`
  mutation CreateGallery($input: CreateGalleryInput) {
    createGallery(input: $input) {
      id
    }
  }
`;

export const UPDATE_GALLERY = gql`
  mutation UpdateGallery($input: UpdateGalleryInput) {
    updateGallery(input: $input)
  }
`;

export const DELETE_GALLERY = gql`
  mutation DeleteGallery($id: Int!) {
    deleteGallery(id: $id)
  }
`;

export const GET_GALLERY_FOR_USERS = gql`
  query GalleryCategoryForUsers {
    galleryCategoryForUsers {
      id
      title
      createdAt
      updatedAt
      galleries {
        id
        title
        city
        images
        createdAt
      }
    }
  }
`;

export const GET_GALLERY_CATEGORY = gql`
  query GalleryCategories {
    galleryCategories {
      id
      title
      createdAt
      updatedAt
      galleries {
        id
      }
    }
  }
`;

export const CREATE_GALLERY_CATEGORY = gql`
  mutation CreateGalleryCategory($input: CreateGalleryCategoryInput) {
    createGalleryCategory(input: $input) {
      id
    }
  }
`;

export const UPDATE_GALLERY_CATEGORY = gql`
  mutation UpdateGalleryCategory($input: UpdateGalleryCategoryInput) {
    updateGalleryCategory(input: $input)
  }
`;

export const DELETE_GALLERY_CATEGORY = gql`
  mutation DeleteGalleryCategory($id: Int!) {
    deleteGalleryCategory(id: $id)
  }
`;
