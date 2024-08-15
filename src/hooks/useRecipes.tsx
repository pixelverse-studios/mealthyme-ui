'use client'
import { useDispatch } from 'react-redux'
import { useLazyQuery, useMutation } from '@apollo/client'

import stripTypenames from '../utils/stripTypenames'
import {
  GET_ALL_RECIPES,
  GET_USER_RECIPES,
  GET_USER_FILTERS,
  GET_ALL_FILTERS
} from '../lib/gql/queries/recipes'
import {
  addNewRecipe,
  setAllFilters,
  setAllRecipes,
  setLoadingRecipes,
  setUserFilters,
  setUserRecipes
} from '../lib/redux/slices/recipes'
import { CREATE_NEW_RECIPE } from '../lib/gql/mutations/recipes'
import Banner from '../components/banner'
import { isHandledError } from '../utils/gql'

const useRecipes = () => {
  const dispatch = useDispatch()

  const [getUserRecipes] = useLazyQuery(GET_USER_RECIPES, {
    onCompleted({ userRecipes }) {
      if (isHandledError(userRecipes)) {
        return Banner.Error(userRecipes.message)
      }
      dispatch(setLoadingRecipes(false))
      return dispatch(setUserRecipes(userRecipes.Recipes))
    },
    onError() {
      dispatch(setLoadingRecipes(false))
      return Banner.TechDiff()
    }
  })
  const fetchUserRecipes = async (userId: string) => {
    dispatch(setLoadingRecipes(true))
    await getUserRecipes({ variables: { userId } })
  }

  const [getRecipes] = useLazyQuery(GET_ALL_RECIPES, {
    onCompleted({ allRecipes }) {
      if (isHandledError(allRecipes)) {
        return Banner.Error(allRecipes.message)
      }
      dispatch(setLoadingRecipes(false))
      return dispatch(setAllRecipes(allRecipes.Recipes))
    },
    onError() {
      dispatch(setLoadingRecipes(false))
      return Banner.TechDiff()
    }
  })
  const fetchAllRecipes = async () => {
    dispatch(setLoadingRecipes(true))
    await getRecipes()
  }

  const resetUserRecipes = () => dispatch(setUserRecipes([]))

  const [getUserFilters] = useLazyQuery(GET_USER_FILTERS, {
    onCompleted({ userFilters }) {
      if (isHandledError(userFilters)) {
        return Banner.Error(userFilters.message)
      }
      return dispatch(setUserFilters(userFilters))
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
      return dispatch(setAllFilters(allFilters))
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
      dispatch(addNewRecipe(stripTypenames(data)))
      return dispatch(setLoadingRecipes(false))
    },
    onError() {
      return Banner.Error('There was an issue creating your recipe.')
    }
  })

  const submitNewRecipe = async (userId: string, payload: any) => {
    dispatch(setLoadingRecipes(true))
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
