import type { Metadata } from 'next'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import ApolloWrapper from '../lib/gql/ApolloWrapper'
import AuthWrapper from '../components/auth'
import Header from '../components/header'
import Navigation from '../components/nav/Navigation'
import { themeOverride } from '../utils/theme'

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
        <ApolloWrapper>
          <MantineProvider theme={themeOverride}>
            <AuthWrapper>
              <Header />
              <div className="AppWrapper">
                <Navigation />
                <main>{children}</main>
              </div>
            </AuthWrapper>
          </MantineProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
