import { router } from 'expo-router'
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'

// firebase
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config'

// components
import { OblongButton } from '../../components/OblongButton'

const handlePress = (email: string, password: string): void => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      router.back()
      router.replace('/home/training')
    })
    .catch(() => {
      Alert.alert('ログイン情報に誤りがあります')
    })
}

const LoginMail = (): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
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
          ログイン
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

export default LoginMail
