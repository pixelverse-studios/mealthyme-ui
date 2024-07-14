import { gql } from '@apollo/client'

export const GET_SEARCH_RESULTS = gql`
  query getSearchResults($query: String!) {
    getSearchResults(query: $query) {
      ... on Autocompletes {
        Autocompletes {
          id
          name
          image
          units
        }
      }
      ... on Errors {
        type
        message
      }
    }
  }
`

export const GET_FOOD = gql`
  query getFood($foodId: Float!, $amount: Float!, $units: String!) {
    getFood(id: $foodId, amount: $amount, units: $units) {
      ... on Food {
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
        estimatedCost
        amount
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
        aisle
      }
      ... on Errors {
        type
        message
      }
    }
  }
`
