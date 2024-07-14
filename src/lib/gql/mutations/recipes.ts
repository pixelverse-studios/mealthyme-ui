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
          foodId
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
        cookingMethod
        allergies
        category {
          _id
          label
        }
        difficulty
        tags
        prepTime
        cookTime
        totalTime
        author {
          name
          authorId
          rating
          difficulty
        }
        image {
          src
          publicId
        }
        interactions {
          ratings {
            score
            createdAt
          }
          comments {
            text
            createdAt
          }
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
