import { gql } from "@apollo/client";

export const GET_TEACHING_SALES = gql`
  query GetTeachingOrders {
    getTeachingOrders {
      id
      order_no
      first_name
      last_name
      full_name
      phone
      email
      payment_method
      sub_total
      status
      createdAt
      updatedAt
      payemnt {
        id
        first_name
        last_name
        full_name
        phone
        email
        payment_method
        reason
        amount
        currency
        status
        tx_ref
        createdAt
        updatedAt
      }

      teachings {
        id
        picture
        trailer
        title
        owner
        description
        content_type
        file_url
        seo_tags
        is_downloadable
        active
        price_etb
        price_usd
        createdAt
        updatedAt
      }
    }
  }
`;
