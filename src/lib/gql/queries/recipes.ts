import { gql } from '@apollo/client'

export const GET_ALL_RECIPES = gql`
  query getRecipes() {
    getRecipes() {
      ... on Recipes {
        Recipes {
          _id
          user {
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
          title
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
          rating
          difficulty
          tags
          author {
            name
            authorId
            rating
            difficulty
          }
          image
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
      }
    }
  }
`
export const GET_USER_RECIPES = gql`
  query Recipes($userId: ID) {
    getRecipes(userId: $userId) {
      ... on Recipes {
        Recipes {
          _id
          user {
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
          title
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
          rating
          difficulty
          tags
          author {
            name
            authorId
            rating
            difficulty
          }
          image
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
      }
    }
  }
`
