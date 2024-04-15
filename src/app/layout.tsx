import type { Metadata } from 'next'

import ApolloWrapper from '@/lib/gql/ApolloWrapper'
import ReduxWrapper from '@/lib/redux/ReduxWrapper'

import Navbar from '@/components/nav'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Meal Thyme',
  description: "It's Meal Thyme!"
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
            <Footer />
          </ReduxWrapper>
        </ApolloWrapper>
      </body>
    </html>
  )
}
