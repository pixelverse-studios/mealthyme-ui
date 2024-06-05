import type { Metadata } from 'next'
import ApolloWrapper from '../lib/gql/ApolloWrapper'
import ReduxWrapper from '../lib/redux/ReduxWrapper'
import AuthWrapper from '../components/auth'
import Navbar from '../components/nav'
import SideNav from '../components/nav/SideNav'

import '../styles/app.css'

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
            <AuthWrapper>
              <Navbar />
              <div className="content">
                <SideNav />
                <main>{children}</main>
              </div>
            </AuthWrapper>
          </ReduxWrapper>
        </ApolloWrapper>
      </body>
    </html>
  )
}
