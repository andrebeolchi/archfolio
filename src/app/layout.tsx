import '@/app/globals.css'

import type { Metadata } from 'next'
import { User } from 'firebase/auth'
import localFont from 'next/font/local'
import { cookies } from 'next/headers'
import { getTokens, Tokens } from 'next-firebase-auth-edge'
import { Claims, filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { clientConfig, serverConfig } from '@/interfaces/firebase/config'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio',
}

const toUser = ({ decodedToken }: Tokens): Partial<User & { customClaims: Claims }> => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    source_sign_in_provider: signInProvider,
  } = decodedToken

  const customClaims = filterStandardClaims(decodedToken)

  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    providerId: signInProvider,
    customClaims,
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })
  const user = tokens ? toUser(tokens) : null

  console.log({ user })

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col overflow-x-hidden">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
