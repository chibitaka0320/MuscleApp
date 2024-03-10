import { View, Text, StyleSheet, Alert } from 'react-native'
import { router } from 'expo-router'

// firebase
import { signOut } from 'firebase/auth'
import { auth } from '../config'

const onLogout = (): void => {
  Alert.alert('ログアウトしますか？', '', [
    {
      text: 'キャンセル'
    },
    {
      text: 'ログアウト',
      style: 'destructive',
      onPress: () => {
        signOut(auth)
          .then(() => {
            router.back()
            router.replace('/auth/login')
          })
          .catch(() => {
            Alert.alert('ログアウトに失敗しました')
          })
      }
    }
  ])
}

export const LogoutButton = (): JSX.Element => {
  return (
    <View style={styles.logOut}>
      <Text onPress={onLogout} style={styles.logOutText}>ログアウト</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  logOut: {
    alignItems: 'center'
  },
  logOutText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20
  }
})
