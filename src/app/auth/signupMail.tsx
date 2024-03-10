import { router } from 'expo-router'
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'

// firebase
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config'

// components
import { OblongButton } from '../../components/OblongButton'

const handlePress = (email: string, password: string): void => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      router.back()
      router.replace('/home/training')
    })
    .catch((error) => {
      const { message } = error
      if (message === 'Firebase: Error (auth/invalid-email).') {
        Alert.alert('メールアドレスを正しく入力してください')
      } else {
        Alert.alert('パスワードを正しく入力してください')
      }
    })
}

const SignupMail = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
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
      </View>
    </View>
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
  }
})

export default SignupMail