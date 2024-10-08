import { gql } from '@apollo/client'

export const CREATE_NEW_RECIPE = gql`
  mutation createRecipe($userId: ID!, $payload: NewRecipePayload) {
    createRecipe(userId: $userId, payload: $payload) {
      ... on Recipe {
        _id
        user {
          _id
          email
          firstName
        }
        title
        servings
        ingredients {
          id
          name
          image
          units {
            base
            short
            long
          }
          possibleUnits
          nutrition {
            name
            amount
            unit
            percentOfDailyNeeds
          }
          caloricBreakdown {
            calories {
              percent
              value
            }
            protein {
              percent
              value
            }
            fat {
              percent
              value
            }
            carb {
              percent
              value
            }
          }
          estimatedCost
          aisle
        }
        macros {
          calories
          protein
          carbs
          fat
        }
        totalEstimatedCost
        instructions
        allergies
        category {
          _id
          label
        }
        difficulty
        tags
        notes
        prepTime
        cookTime
        totalTime
        image {
          src
          publicId
        }
        createdAt
        updatedAt
      }
      ... on Errors {
        type
        message
      }
    }
  }
`

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`
