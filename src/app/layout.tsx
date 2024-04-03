import type { Metadata } from 'next'

import ApolloWrapper from '@/lib/gql/ApolloWrapper'
import ReduxWrapper from '@/lib/redux/ReduxWrapper'
import Navbar from '@/components/nav'

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
          <ReduxWrapper>
            <Navbar />

            {children}
          </ReduxWrapper>
        </ApolloWrapper>
      </body>
    </html>
  )
}
