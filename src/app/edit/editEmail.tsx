import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

// components
import { LandscapeButton } from '../../components/LandscapeButton'

// firebase
import { EmailAuthProvider, reauthenticateWithCredential, signOut, verifyBeforeUpdateEmail } from 'firebase/auth'
import { auth } from '../../config'

const handlePress = async (currentEmail: string, newEmail: string, password: string): Promise<void> => {
  const user = auth.currentUser
  const credential = EmailAuthProvider.credential(currentEmail, password)
  if (user === null) return
  reauthenticateWithCredential(user, credential)
    .then(() => {
      verifyBeforeUpdateEmail(user, newEmail)
        .then(() => {
          Alert.alert('新しいメールアドレスにメールを送信しました', '24時間以内にメールを認証し、再ログインしてください', [
            {
              text: 'OK',
              onPress: () => {
                signOut(auth)
                  .then(() => {
                    while (router.canGoBack()) {
                      router.back()
                    }
                    router.replace('/auth/login')
                  })
                  .catch(() => {
                    Alert.alert('エラー')
                  })
              }
            }
          ])
          console.log('success')
        })
        .catch((error: any) => {
          console.log(error)
          Alert.alert('メールアドレスを正しく入力してください')
        })
    })
    .catch(() => {
      Alert.alert('パスワードが違います')
    })
}

const editEmail = (): JSX.Element => {
  const currentEmail = String(useLocalSearchParams().email)
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View style={styles.container}>
        <View style={styles.item}>
          <Text>現在のメールアドレス</Text>
          <TextInput
            style={styles.text}
            editable={false}
          >{currentEmail}
          </TextInput>
        </View>
        <View style={styles.item}>
          <Text>新しいメールアドレス</Text>
          <TextInput
            style={styles.textInput}
            autoFocus
            autoCapitalize='none'
            value={newEmail}
            onChangeText={(value) => { setNewEmail(value) }}
            keyboardType='email-address'
            textContentType='emailAddress'
            >
          </TextInput>
        </View>
        <View style={styles.item}>
          <Text>パスワード</Text>
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
          <LandscapeButton onPress={() => { void handlePress(currentEmail, newEmail, password) }} >変更</LandscapeButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  item: {
    marginBottom: 10
  },
  text: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 10,
    height: 40,
    marginVertical: 5
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
    alignItems: 'center',
    marginTop: 240
  }
})

export default editEmail
