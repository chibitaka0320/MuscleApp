import { View, Text, StyleSheet, Alert } from 'react-native'

// firebase
import { auth } from '../../config'

// components
import { LandscapeButton } from '../../components/LandscapeButton'
import { deleteUser } from 'firebase/auth'
import { router } from 'expo-router'

const onDelete = (): void => {
  Alert.alert('ログアウトしますか？', '', [
    {
      text: 'キャンセル'
    },
    {
      text: 'ログアウト',
      style: 'destructive',
      onPress: () => {
        if (auth.currentUser === null) return
        deleteUser(auth.currentUser)
          .then(() => {
            router.canGoBack()
            router.replace('/auth/login')
          })
          .catch(() => {
            Alert.alert('アカウントの削除に失敗しました')
          })
      }
    }
  ])
}

const DeleteAccount = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>注意事項</Text>
      <Text>アカウントを削除されますと、今まで記録したデータが全て削除され、復元もできなくなります。</Text>
      <Text>間違って削除した場合でも、アカウントの復旧はできませんのでご了承ください。</Text>
      <View style={styles.button}>
        <LandscapeButton onPress={onDelete}>アカウントを削除する</LandscapeButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10
  },
  button: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center'
  }
})

export default DeleteAccount
