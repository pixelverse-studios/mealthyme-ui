import { gql } from '@apollo/client'

export const SUBMIT_FEEDBACK = gql`
  mutation createFeedback($payload: NewFeedbackPayload!, $userId: ID!) {
    createFeedback(payload: $payload, userId: $userId) {
      ... on Feedback {
        description
        acked
      }
      ... on Errors {
        type
        message
      }
    }
  }
`
