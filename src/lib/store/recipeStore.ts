import { create } from 'zustand'

import { RecipeType } from '../../utils/types/recipes'
import { COZY, layoutMap } from '../../app/recipes/components/feed/LayoutSelect'

type State = {
  all: RecipeType[] | []
  user: RecipeType[] | []
  filtered: []
  userFilters: any
  allFilters: any
  layout: { label: any; value: string }
  loading: boolean
  recap: any
}

type Actions = {
  setLoadingRecipes: (loading: boolean) => void
  setAllRecipes: (recipes: [RecipeType] | []) => void
  setUserRecipes: (recipes: [RecipeType] | []) => void
  addNewRecipe: (newRecipe: RecipeType) => void
  setFilteredResults: (filters: any) => void
  clearFilters: () => void
  setUserFilters: (filters: any) => void
  setLayout: (layout: { label: any; value: string }) => void
  setAllFilters: (filters: any) => void
  removeDeletedRecipe: (id: string) => void
}

const useRecipeStore = create<State & Actions>(set => ({
  all: [],
  user: [],
  filtered: [],
  userFilters: {},
  allFilters: {},
  layout: layoutMap.get(COZY),
  loading: false,
  recap: {},
  setLoadingRecipes: loading => set(state => ({ ...state, loading })),
  setAllRecipes: recipes => set(state => ({ ...state, all: recipes })),
  setUserRecipes: recipes => set(state => ({ ...state, user: recipes })),
  addNewRecipe: newRecipe =>
    set(state => ({
      ...state,
      all: [...state.all, newRecipe],
      user: [...state.user, newRecipe],
      recap: newRecipe
    })),
  setFilteredResults: filteredRecipes =>
    set(state => ({ ...state, filtered: filteredRecipes })),
  clearFilters: () => set(state => ({ ...state, filtered: [] })),
  setLayout: layout => set(state => ({ ...state, layout })),
  setUserFilters: filters => set(state => ({ ...state, userFilters: filters })),
  setAllFilters: filters => set(state => ({ ...state, allFilters: filters })),
  removeDeletedRecipe: id =>
    set(state => ({
      ...state,
      all: [...state.all].filter(recipe => recipe._id !== id),
      user: [...state.user].filter(recipe => recipe._id !== id)
    }))
}))

export default useRecipeStore
