import { gql } from "@apollo/client";

export const GET_VISITOR_PRAYER_SCHEDULES = gql`
  query VisitorPrayerSchedules {
    guestHousePrayerSchedules {
      id
      date
      start_time
      end_time
      availabile
      payment_amount_usd
      payment_amount_etb
      pickup_extra_payment_usd
      pickup_extra_payment_etb
      createdAt
      updatedAt
      status
    }
  }
`;

export const CREATE_VISITOR_PRAYER_SCHEDULE = gql`
  mutation CreateVisitorPrayerSchedule(
    $input: CreateVisitorPrayerScheduleInput!
  ) {
    createVisitorPrayerSchedule(input: $input) {
      id
    }
  }
`;

export const CREATE_VISITOR = gql`
  mutation CreateVisitor($input: CreateVisitorInput!) {
    createVisitor(input: $input) {
      message
      status
      data {
        checkout_url
      }
    }
  }
`;

export const GET_VISITOR_PRAYER_SCHEDULE_FOR_USER = gql`
  query VisitorPrayerScheulesForUsers {
    guestHousePrayerScheulesForUsers {
      id
      date
      start_time
      end_time
      availabile
      status
      payment_amount_usd
      payment_amount_etb
      pickup_extra_payment_usd
      pickup_extra_payment_etb
      createdAt
    }
  }
`;

export const CREATE_VISITOR_PRAYER_ORDER = gql`
  mutation CreateVisitorOrder($input: CreateVisitorInput) {
    createVisitorOrder(input: $input)
  }
`;

export const CAPTURE_VISITOR_PRAYER_ORDER = gql`
  mutation CaptureVisitorOrder($orderId: String!) {
    captureVisitorOrder(orderID: $orderId)
  }
`;

export const GET_VISITOR_PRAYERS = gql`
  query Visitors {
    Visitors {
      id
      first_name
      last_name
      email
      phone

      address
      request_detail
      # include_pickup_from_airport
      # status
      createdAt
      # updatedAt

      date

      # start_date
      # end_date
      # schedule {
      #   start_time
      #   end_time
      #   payment_amount_etb
      #   payment_amount_usd
      # }
    }
  }
`;

export const UPDATE_VISITOR_PRAYER_SCHEDULE = gql`
  mutation UpdateVisitorPrayerSchedule(
    $input: UpdateVisitorPrayerScheduleInput!
  ) {
    updateVisitorPrayerSchedule(input: $input)
  }
`;

export const DELETE_VISITOR_PRAYER_SCHEDULE = gql`
  mutation DeleteVisitorPrayerSchedule($id: Int!) {
    deleteVisitorPrayerSchedule(id: $id)
  }
`;

export const DELETE_VISITOR_PRAYER = gql`
  mutation DeleteVisitorPrayer($id: Int!) {
    deleteVisitorPrayer(id: $id)
  }
`;
