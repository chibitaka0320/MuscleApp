import { Stack } from 'expo-router'
import { BackButton } from '../components/BackButton'

const Layout = (): JSX.Element => {
  return (
    <Stack
      screenOptions={{
        headerTitle: 'Muscle',
        headerStyle: {
          // backgroundColor: '#94E1F2'
        }
      }}
    >
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
      <Stack.Screen
        name='auth/loginMail'
        options={{
          presentation: 'modal',
          headerLeft: () => { return (<BackButton/>) },
          headerTitle: 'ログイン'
        }}
      />

    </Stack>
  )
}

export default Layout
