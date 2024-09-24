export interface NavItemType {
  label: string
  route: string
}

export const userLinks = (loggedIn: boolean): NavItemType[] =>
  loggedIn
    ? [
        { label: 'Settings', route: '/settings' },
        { label: 'Premium', route: '/settings/premium' }
      ]
    : []

export const RECIPE_ROUTES = {
  all: '/recipes/all',
  mine: '/recipes/mine',
  create: '/recipes/new',
  recap: '/recipes/new/recap',
  view: '/recipes/view'
}
const baseRecipeLinks = [{ label: 'All', route: RECIPE_ROUTES.all }]
const additionalRecipeLinks = [{ label: 'Mine', route: RECIPE_ROUTES.mine }]
export const recipeLinks = (loggedIn: boolean): NavItemType[] =>
  loggedIn ? [...baseRecipeLinks, ...additionalRecipeLinks] : baseRecipeLinks

// const baseResources = []
// const baseResources = [{ label: 'About', route: '/about' }]
const additionalResources = [
  { label: 'Feedback', route: '/feedback' }
  // { label: 'Settings', route: '/settings' }
]
export const resources = (loggedIn: boolean): NavItemType[] | [] =>
  loggedIn ? additionalResources : []
// loggedIn ? [...additionalResources, ...baseResources] : baseResources
