import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import type { Metadata } from 'next'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import ApolloWrapper from '../lib/gql/ApolloWrapper'
import ReduxWrapper from '../lib/redux/ReduxWrapper'
import AuthWrapper from '../components/auth'
import Navbar from '../components/nav'
import SideNav from '../components/nav/SideNav'

import '@mantine/core/styles.css'
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
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ApolloWrapper>
            <ReduxWrapper>
              <MantineProvider>
                <AuthWrapper>
                  <Navbar />
                  <div className="content">
                    <SideNav />
                    <main>{children}</main>
                  </div>
                </AuthWrapper>
              </MantineProvider>
            </ReduxWrapper>
          </ApolloWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
