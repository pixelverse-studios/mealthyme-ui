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

export const RECIPE_ROUTES = { all: '/recipes/all', mine: '/recipes/mine' }
const baseRecipeLinks = [{ label: 'All', route: RECIPE_ROUTES.all }]
const additionalRecipeLinks = [{ label: 'Mine', route: RECIPE_ROUTES.mine }]
export const recipeLinks = (loggedIn: boolean): NavItemType[] =>
  loggedIn ? [...additionalRecipeLinks, ...baseRecipeLinks] : baseRecipeLinks

const baseResources = [{ label: 'About', route: '/about' }]
const additionalResources = [{ label: 'Settings', route: '/settings' }]
export const resources = (loggedIn: boolean): NavItemType[] =>
  loggedIn ? [...additionalResources, ...baseResources] : baseResources
