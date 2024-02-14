import { gql } from '@apollo/client'

export const GET_USER = gql`
  query GetUser($email: String) {
    getUser(email: $email) {
      ... on User {
        _id
        email
        firstName
        lastName
        providerId
        avatar
        createdAt
        lastLogin
        newUser
        tier
      }
      ... on Errors {
        type
        message
      }
    }
  }
`
