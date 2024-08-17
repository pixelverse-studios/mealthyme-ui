'use client'
import { useLazyQuery, useMutation } from '@apollo/client'

import stripTypenames from '../utils/stripTypenames'
import {
  GET_ALL_RECIPES,
  GET_USER_RECIPES,
  GET_USER_FILTERS,
  GET_ALL_FILTERS
} from '../lib/gql/queries/recipes'
import { useRecipeStore } from '../lib/store'
import { CREATE_NEW_RECIPE } from '../lib/gql/mutations/recipes'
import Banner from '../components/banner'
import { isHandledError } from '../utils/gql'

const useRecipes = () => {
  const {
    addNewRecipe,
    setAllFilters,
    setAllRecipes,
    setLoadingRecipes,
    setUserFilters,
    setUserRecipes
  } = useRecipeStore()

  const [getUserRecipes] = useLazyQuery(GET_USER_RECIPES, {
    onCompleted({ userRecipes }) {
      if (isHandledError(userRecipes)) {
        return Banner.Error(userRecipes.message)
      }
      setLoadingRecipes(false)
      return setUserRecipes(userRecipes.Recipes)
    },
    onError() {
      setLoadingRecipes(false)
      return Banner.TechDiff()
    }
  })
  const fetchUserRecipes = async (userId: string) => {
    setLoadingRecipes(true)
    await getUserRecipes({ variables: { userId } })
  }

  const [getRecipes] = useLazyQuery(GET_ALL_RECIPES, {
    onCompleted({ allRecipes }) {
      if (isHandledError(allRecipes)) {
        return Banner.Error(allRecipes.message)
      }
      setLoadingRecipes(false)
      return setAllRecipes(allRecipes.Recipes)
    },
    onError() {
      setLoadingRecipes(false)
      return Banner.TechDiff()
    }
  })
  const fetchAllRecipes = async () => {
    setLoadingRecipes(true)
    await getRecipes()
  }

  const resetUserRecipes = () => setUserRecipes([])

  const [getUserFilters] = useLazyQuery(GET_USER_FILTERS, {
    onCompleted({ userFilters }) {
      if (isHandledError(userFilters)) {
        return Banner.Error(userFilters.message)
      }
      return setUserFilters(userFilters)
    },
    onError() {
      return Banner.Error('There was an issue retrieving available filters.')
    }
  })
  const fetchUserFilters = (id: string) =>
    getUserFilters({ variables: { userId: id } })

  const [getAllFilters] = useLazyQuery(GET_ALL_FILTERS, {
    onCompleted({ allFilters }) {
      if (isHandledError(allFilters)) {
        return Banner.Error(allFilters.message)
      }
      return setAllFilters(allFilters)
    },
    onError() {
      return Banner.Error('There was an issue retrieving available filters.')
    }
  })
  const fetchAllFilters = () => getAllFilters()

  const [createRecipe] = useMutation(CREATE_NEW_RECIPE, {
    onCompleted({ createRecipe: data }) {
      if (isHandledError(data)) {
        return Banner.Error(data.message)
      }
      addNewRecipe(stripTypenames(data))
      return setLoadingRecipes(false)
    },
    onError() {
      return Banner.Error('There was an issue creating your recipe.')
    }
  })

  const submitNewRecipe = async (userId: string, payload: any) => {
    setLoadingRecipes(true)
    await createRecipe({ variables: { userId, payload } })
  }

  return {
    fetchAllFilters,
    fetchAllRecipes,
    fetchUserFilters,
    fetchUserRecipes,
    resetUserRecipes,
    submitNewRecipe
  }
}

export default useRecipes
