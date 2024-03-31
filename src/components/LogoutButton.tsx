import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
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
            while (router.canGoBack()) {
              router.back()
            }
            router.replace('/auth/loginMail')
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
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogout} >
        <Text style={styles.outText}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: '#DEDDDC'
  },
  outText: {
    fontSize: 16,
    marginVertical: 10,
    paddingVertical: 10
  }
})
