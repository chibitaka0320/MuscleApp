import { router } from 'expo-router'
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'

// firebase
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config'

// components
import { OblongButton } from '../../components/OblongButton'

const handlePress = (email: string, password: string): void => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      while (router.canGoBack()) {
        router.back()
      }
      router.replace('/home/training')
    })
    .catch((error: any) => {
      const { message } = error
      if (message === 'Firebase: Error (auth/invalid-email).') {
        Alert.alert('メールアドレスを正しく入力してください')
      } else if (message === 'Firebase: Error (auth/email-already-in-use).') {
        Alert.alert('メールアドレスはすでに登録されています')
      } else {
        Alert.alert('パスワードを正しく入力してください')
      }
    })
}

const login = (): void => {
  router.replace('auth/loginMail')
}

const SignupMail = (): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View style={styles.container}>
        <View style={styles.contents}>
          <View style={styles.items}>
            <Text style={styles.itemText}>メールアドレス</Text>
            <TextInput
              style={styles.itemTextInput}
              placeholder='Email address'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              value={email}
              onChangeText={(value) => { setEmail(value) }}
            >
            </TextInput>
          </View>
          <View style={styles.items}>
            <Text style={styles.itemText}>パスワード</Text>
            <TextInput
              style={styles.itemTextInput}
              placeholder='Password'
              autoCapitalize='none'
              secureTextEntry
              textContentType='password'
              value={password}
              onChangeText={(value) => { setPassword(value) }}
            >
            </TextInput>
          </View>
          <OblongButton style={{ marginVertical: 40 }} onPress={() => { handlePress(email, password) }}>
            新規登録
          </OblongButton>
          <View style={styles.loginTrans}>
            <TouchableOpacity style={styles.loginLink} onPress={login}>
              <Text style={styles.loginLinkText}>すでにアカウントをお持ちの場合</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contents: {
    flex: 1,
    margin: 30
  },
  items: {
    marginVertical: 20
  },
  itemText: {
    marginBottom: 10,
    fontWeight: 'bold'
  },
  itemTextInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEDDDC',
    borderRadius: 3,
    fontSize: 16,
    padding: 10
  },
  loginTrans: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginLink: {
    marginLeft: 10
  },
  loginLinkText: {
    fontWeight: 'bold'
  }
})

export default SignupMail
