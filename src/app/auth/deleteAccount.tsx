import { View, Text, StyleSheet, Alert, TextInput } from 'react-native'

// firebase
import { auth } from '../../config'

// components
import { LandscapeButton } from '../../components/LandscapeButton'
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential } from 'firebase/auth'
import { router } from 'expo-router'
import { useState } from 'react'

const onDelete = (password: string): void => {
  Alert.alert('アカウントを削除しますか', '', [
    {
      text: 'キャンセル'
    },
    {
      text: '削除',
      style: 'destructive',
      onPress: () => {
        const user = auth.currentUser
        if (user?.email === null || user?.email === undefined) return
        const credential = EmailAuthProvider.credential(user?.email, password)
        if (auth.currentUser === null) return
        reauthenticateWithCredential(auth.currentUser, credential)
          .then(() => {
            deleteUser(user)
              .then(() => {
                while (router.canGoBack()) {
                  router.back()
                }
                router.replace('/auth/login')
              })
              .catch((error: any) => {
                console.log(error)
                Alert.alert('アカウントの削除に失敗しました')
              })
          })
          .catch(() => {
            Alert.alert('パスワードが違います')
          })
      }
    }
  ])
}

const DeleteAccount = (): JSX.Element => {
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>注意事項</Text>
      <Text>アカウントを削除されますと、今まで記録したデータが全て削除され、復元もできなくなります。</Text>
      <Text>間違って削除した場合でも、アカウントの復旧はできませんのでご了承ください。</Text>

      <View style={styles.password}>
        <Text>確認用パスワード</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize='none'
          secureTextEntry
          value={password}
          onChangeText={(value) => { setPassword(value) }}
          >
        </TextInput>
      </View>

      <View style={styles.button}>
        <LandscapeButton onPress={() => { onDelete(password) }}>アカウントを削除する</LandscapeButton>
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
  password: {
    marginTop: 60
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEDDDC',
    borderRadius: 3,
    fontSize: 16,
    paddingHorizontal: 10,
    height: 40,
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