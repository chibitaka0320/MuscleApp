import { router } from 'expo-router'
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'

// firebase
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config'

// components
import { OblongButton } from '../../components/OblongButton'

const handlePress = (email: string, password: string): void => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      while (router.canGoBack()) {
        router.back()
      }
      router.replace('/home/training')
    })
    .catch(() => {
      Alert.alert('ログイン情報に誤りがあります')
    })
}

const signup = (): void => {
  router.replace('auth/signupMail')
}

const LoginMail = (): JSX.Element => {
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
            ログイン
          </OblongButton>
          <View style={styles.signupTrans}>
            <View>
              <Text>アカウントをお持ちでない場合</Text>
            </View>
            <TouchableOpacity style={styles.signupLink} onPress={signup}>
              <Text style={styles.signupLinkText}>ご登録はこちら</Text>
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
  signupTrans: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  signupLink: {
    marginLeft: 10
  },
  signupLinkText: {
    fontWeight: 'bold'
  }
})

export default LoginMail
