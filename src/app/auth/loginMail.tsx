import { router } from 'expo-router'
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native'

// firebase
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config'

// components
import { OblongButton } from '../../components/OblongButton'

const signup = (): void => {
  router.replace('auth/signupMail')
}

const resetPass = (): void => {
  router.push('auth/resettingPass')
}

const LoginMail = (): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [visible, setVisible] = useState(false)

  const handlePress = (): void => {
    setVisible(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        while (router.canGoBack()) {
          router.back()
        }
        router.replace('/home/training')
      })
      .catch(() => {
        Alert.alert('ログイン情報に誤りがあります')
        setVisible(false)
      })
  }

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
          <OblongButton style={{ marginVertical: 40 }} onPress={() => { handlePress() }}>
            ログイン
          </OblongButton>
          <View style={styles.trans}>
            {/* <View>
              <Text>アカウントをお持ちでない場合</Text>
            </View> */}
            <TouchableOpacity style={styles.transLink} onPress={signup}>
              <Text style={styles.transLinkText}>アカウントをお持ちでない場合</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.trans}>
            <TouchableOpacity style={styles.transLink} onPress={resetPass}>
              <Text style={styles.transLinkText}>パスワードを忘れ場場合</Text>
            </TouchableOpacity>
          </View>
        </View>
        {visible && <ActivityIndicator style={styles.active}/>}
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
  active: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
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
  trans: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  transLink: {
    marginLeft: 10
  },
  transLinkText: {
    fontWeight: 'bold'
  }
})

export default LoginMail
