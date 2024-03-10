import { Stack } from 'expo-router'
import { BackButton } from '../components/BackButton'

const Layout = (): JSX.Element => {
  return (
    <Stack
      screenOptions={{
        headerTitle: ''
      }}
    >
      <Stack.Screen
        name='auth/loginMail'
        options={{
          presentation: 'modal',
          headerLeft: () => { return (<BackButton/>) },
          headerTitle: 'ログイン'
        }}
      />
      <Stack.Screen
        name='auth/signupMail'
        options={{
          presentation: 'modal',
          headerLeft: () => { return (<BackButton/>) },
          headerTitle: '新規登録'
        }}
      />
      <Stack.Screen
        name='menu/menu'
        options={{
          headerTitle: 'Menu',
          headerLeft: () => { return (<BackButton/>) }
        }}
      />
      <Stack.Screen
        name='create/createMenu'
        options={{
          presentation: 'modal',
          headerLeft: () => { return (<BackButton/>) }
        }}
      />
    </Stack>
  )
}

export default Layout
