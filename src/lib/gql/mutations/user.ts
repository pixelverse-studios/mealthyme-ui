import { gql } from '@apollo/client'

export const SIGN_IN = gql`
  mutation signIn(
    $email: String
    $fullName: String
    $avatar: String
    $providerId: String
  ) {
    signIn(
      email: $email
      fullName: $fullName
      avatar: $avatar
      providerId: $providerId
    ) {
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

export const DELETE_PROFILE = gql`
  mutation DeleteProfile($email: String) {
    deleteProfile(email: $email) {
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
