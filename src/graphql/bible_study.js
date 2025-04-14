import { gql } from "@apollo/client";

export const GET_BIBLE_STUDY_SESSIONS = gql`
  query BibleStudySessions {
    bibleStudySessions {
      id
      title
      description
      date
      start_time
      end_time
      zoom_id
      zoom_link
      zoom_passcode
      payment_amount_usd
      payment_amount_etb
      status
      createdAt
      updatedAt
      picture
    }
  }
`;

export const GET_BIBLE_STUDY_APPLICATIONS = gql`
  query BibleStudyApplications {
    bibleStudyApplications {
      id
      first_name
      last_name
      email
      phone
      title
      description
      date
      zoom_id
      zoom_link
      zoom_passcode
      payment_amount
      status
      createdAt
    }
  }
`;

export const CREATE_BIBLE_STUDY_SESSION = gql`
  mutation CreateBibleStudySession($input: CreateBibleStudySessionInput!) {
    createBibleStudySession(input: $input) {
      id
    }
  }
`;
export const APPLY_FOR_BIBLE_STUDY_ = gql`
  mutation ApplyForBibleStudy($input: CreateBibleStudyApplicationInput!) {
    applyForBibleStudy(input: $input)
  }
`;
export const REGISTER_MEMBERS_BS = gql`
  mutation RegisterBiblesStudyMembers(
    $input: CreateBibleStudyApplicationInput!
  ) {
    registerBiblesStudyMembers(input: $input)
  }
`;
export const GET_BIBLE_STUDY_SESSIONS_FOR_USERS = gql`
  query BibleStudySessionsForUsers {
    bibleStudySessionsForUsers {
      id
      title
      description
      date
      start_time
      end_time
      payment_amount_usd
      payment_amount_etb
      createdAt
      picture
    }
  }
`;
export const CREATE_BIBLE_STUDY_ORDER = gql`
  mutation CreateBibleStudyOrder($input: CreateBibleStudyApplicationInput) {
    createBibleStudyOrder(input: $input)
  }
`;
export const CAPTURE_BIBLE_STUDY_ORDER = gql`
  mutation CaptureBibleStudyOrder($orderId: String!) {
    captureBibleStudyOrder(orderID: $orderId)
  }
`;

export const UPDATE_BIBLE_STUDY_SESSION = gql`
  mutation UpdateBibleStudySession($input: UpdateBibleStudySessionInput!) {
    updateBibleStudySession(input: $input)
  }
`;
export const DELETE_BIBLE_STUDY_SESSION = gql`
  mutation DeleteBibleStudySession($id: Int!) {
    deleteBibleStudySession(id: $id)
  }
`;
export const DELETE_BIBLE_STUDY_APPLICATION = gql`
  mutation DeleteBibleStudyApplication($id: Int!) {
    deleteBibleStudyApplication(id: $id)
  }
`;
export const SEND_BULK_EMAIL_FOR_MEMBERS = gql`
  mutation Mutation($input: BulkEmailInput!) {
    sendBulkEmailForPropheticSchoolMembers(input: $input)
  }
`;
export const SEND_BULK_EMAIL_FOR_PARTNERS = gql`
  mutation SendBulkEmailForPartners($input: BulkEmailInput!) {
    sendBulkEmailForPartners(input: $input)
  }
`;
