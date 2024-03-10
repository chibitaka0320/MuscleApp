// import { useEffect } from 'react'
// import { Redirect, router } from 'expo-router'

// // firebase
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from '../config'

// const Index = (): JSX.Element => {
//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user !== null) {
//         router.replace('home')
//       }
//     })
//   }, [])

//   return (
//     <Redirect href='auth/login'/>
//   )
// }

// export default Index

import { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'

// firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config'

const Index = (): JSX.Element | null => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(user !== null)
    })

    return () => { unsubscribe() }
  }, [])

  if (isAuthenticated === null) {
    // 認証の状態が確定するまで何も表示しないか、ローディング中の表示を行うこともできます
    return null
  }

  return (
    <Redirect href={isAuthenticated ? 'home' : 'auth/login'} />
  )
}

export default Index
