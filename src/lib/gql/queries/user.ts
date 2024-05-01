import { gql } from '@apollo/client'

export const GET_USER = gql`
  query user($email: String!) {
    user(email: $email) {
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
