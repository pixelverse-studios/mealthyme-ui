import type { Metadata } from 'next'

import ApolloWrapper from '@/lib/gql/ApolloWrapper'
import ReduxWrapper from '@/lib/redux/ReduxWrapper'

export const metadata: Metadata = {
  title: 'PantryPal',
  description: 'Your pantry found their best friend.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <ReduxWrapper>{children}</ReduxWrapper>
        </ApolloWrapper>
      </body>
    </html>
  )
}
