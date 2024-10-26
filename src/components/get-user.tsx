import { User } from 'firebase/auth'
import { cookies } from 'next/headers'
import { getTokens, Tokens } from 'next-firebase-auth-edge'
import { Claims, filterStandardClaims } from 'next-firebase-auth-edge/lib/auth/claims'

import { clientConfig, serverConfig } from '@/interfaces/firebase/config'

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

export const getUser = async () => {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  })

  return tokens ? toUser(tokens) : null
}
