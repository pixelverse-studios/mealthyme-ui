import { gql } from '@apollo/client'

export const GET_ALL_RECIPES = gql`
  query allRecipes {
    allRecipes {
      ... on Recipes {
        Recipes {
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
          prepTime
          cookTime
          totalTime
          cookingMethod
          allergies
          category {
            _id
            label
          }
          rating
          difficulty
          tags
          image
          createdAt
          updatedAt
        }
      }
    }
  }
`
export const GET_USER_RECIPES = gql`
  query userRecipes($userId: ID!) {
    userRecipes(userId: $userId) {
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
          prepTime
          cookTime
          totalTime
          category {
            _id
            label
          }
          rating
          difficulty
          tags
          image
          createdAt
          updatedAt
        }
      }
    }
  }
`

export const GET_USER_FILTERS = gql`
  query getUserFilters($userId: ID!) {
    userFilters(userId: $userId) {
      ... on Filter {
        titles
        ingredients {
          names
          aisles
        }
        macros {
          calories {
            min
            max
            step
          }
          protein {
            min
            max
            step
          }
          carbs {
            min
            max
            step
          }
          fat {
            min
            max
            step
          }
        }
        cost {
          min
          max
          step
        }
        cookingMethod
        category {
          _id
          label
        }
        allergies
        rating {
          min
          max
          step
        }
        difficulty {
          min
          max
          step
        }
        tags
        createdAt {
          min
          max
          step
        }
        updatedAt {
          min
          max
          step
        }
        users {
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
      }
      ... on Errors {
        type
        message
      }
    }
  }
`

export const GET_ALL_FILTERS = gql`
  query getAllFilters {
    allFilters {
      ... on Filter {
        titles
        ingredients {
          names
          aisles
        }
        macros {
          calories {
            min
            max
            step
          }
          protein {
            min
            max
            step
          }
          carbs {
            min
            max
            step
          }
          fat {
            min
            max
            step
          }
        }
        cost {
          min
          max
          step
        }
        cookingMethod
        category {
          _id
          label
        }
        allergies
        rating {
          min
          max
          step
        }
        difficulty {
          min
          max
          step
        }
        tags
        createdAt {
          min
          max
          step
        }
        updatedAt {
          min
          max
          step
        }
        users {
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
        prepTime {
          min
          max
          step
        }
        cookTime {
          min
          max
          step
        }
        totalTime {
          min
          max
          step
        }
      }
      ... on Errors {
        type
        message
      }
    }
  }
`
