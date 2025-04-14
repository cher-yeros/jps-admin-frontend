import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation CreateBlog($input: CreateBlogInput) {
    createBlog(input: $input) {
      id
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput) {
    createCategory(input: $input) {
      id
    }
  }
`;
// export const CREATE_TAG = gql``;

export const GET_BLOGS = gql`
  query Blogs {
    blogs {
      id
      title
      slug
      excerpt
      body
      featured
      image
      createdAt
      updatedAt
      user {
        id
        full_name
        first_name
        last_name
      }
      category {
        id
        title
      }
    }
  }
`;
export const GET_CATEGORYS = gql`
  query Categories {
    categories {
      id
      title
      createdAt
      updatedAt
      # blogs {
      #   id
      # }
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation editBlog($input: UpdateBlogInput!) {
    editBlog(input: $input)
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation editCategory($input: UpdateCategoryInput!) {
    editCategory(input: $input)
  }
`;

export const UPDATE_TAG = gql`
  mutation editTag($input: UpdateTagInput!) {
    editTag(input: $input)
  }
`;

export const DELETE_BLOG = gql`
  mutation deleteBlog($id: Int!) {
    deleteBlog(id: $id)
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`;

export const DELETE_TAG = gql`
  mutation deleteTag($id: Int!) {
    deleteTag(id: $id)
  }
`;
