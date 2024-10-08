import { gql } from '@apollo/client'

export const GET_RECIPE_BY_ID = gql`
  query recipe($recipeId: ID!) {
    recipe(id: $recipeId) {
      ... on Recipe {
        _id
        user {
          _id
          email
          firstName
          avatar
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
          amount
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
            amount
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
          allergies
          category {
            _id
            label
          }
          difficulty
          tags
          notes
          image {
            src
            publicId
          }
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
            amount
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
          prepTime
          cookTime
          totalTime
          category {
            _id
            label
          }
          difficulty
          tags
          notes
          image {
            src
            publicId
          }
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
        category {
          _id
          label
        }
        allergies
        difficulty {
          min
          max
          step
        }
        tags
        notes
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
        category {
          _id
          label
        }
        allergies
        difficulty {
          min
          max
          step
        }
        tags
        notes
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
