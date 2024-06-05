import { setContext } from '@apollo/client/link/context'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

import { USER_TOKEN } from '../../utils/constants'

const URI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5050/graphql'
    : 'https://mealthyme-server-rxtkj.ondigitalocean.app/graphql'
const httpLink = new HttpLink({ uri: URI })
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(USER_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
