import { gql } from '@apollo/client'

export const GET_USER_CATEGORIES = gql`
  query getAllUserCategories($userId: ID!) {
    getAllUserCategories(userId: $userId) {
      ... on UsersCategories {
        UsersCategories {
          _id
          label
        }
      }
      ... on Errors {
        type
        message
      }
    }
  }
`
