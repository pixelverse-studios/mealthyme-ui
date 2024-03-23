'use client'

import { client } from './client'
import { ApolloProvider } from '@apollo/client'

export default function ApolloWrapper({
  children
}: {
  children: React.ReactNode
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
