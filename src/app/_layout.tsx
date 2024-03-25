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
          headerLeft: () => { return (<BackButton/>) }
        }}
      />
      <Stack.Screen
        name='setting/profSetting'
        options={{
          headerLeft: () => { return (<BackButton/>) }
        }}
      />
      <Stack.Screen
        name='setting/goalSetting'
        options={{
          headerLeft: () => { return (<BackButton/>) }
        }}
      />
      <Stack.Screen
        name='setting/accountSetting'
        options={{
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
        name='create/createEat'
        options={{
          headerTitle: 'メールアドレス変更',
          headerLeft: () => { return (<BackButton/>) }
        }}
      />
      <Stack.Screen
        name='create/createTraining'
        options={{
          headerTitle: 'メールアドレス変更',
          headerLeft: () => { return (<BackButton/>) }
        }}
      />
      <Stack.Screen
        name='edit/editEmail'
        options={{
          headerTitle: 'メールアドレス変更',
          headerLeft: () => { return (<BackButton/>) }
        }}
      />
      <Stack.Screen
        name='edit/editProf'
        options={{
          presentation: 'modal',
          headerLeft: () => { return (<BackButton/>) }
        }}
      />
      <Stack.Screen
        name='edit/editGoal'
        options={{
          presentation: 'modal',
          headerLeft: () => { return (<BackButton/>) }
        }}
      />
    </Stack>
  )
}

export default Layout
