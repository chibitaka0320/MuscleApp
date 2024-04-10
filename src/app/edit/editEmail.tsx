import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard, ActivityIndicator, TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

// components
import { LandscapeButton } from '../../components/LandscapeButton'

// firebase
import { EmailAuthProvider, fetchSignInMethodsForEmail, reauthenticateWithCredential, signOut, verifyBeforeUpdateEmail } from 'firebase/auth'
import { auth } from '../../config'

const resetPass = (): void => {
  router.push('auth/resettingPass')
}

const editEmail = (): JSX.Element => {
  const currentEmail = String(useLocalSearchParams().email)
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const handlePress = async (): Promise<void> => {
    setVisible(true)
    const user = auth.currentUser
    if (user === null) return
    if (user.email === null) return
    const credential = EmailAuthProvider.credential(user?.email, password)
    reauthenticateWithCredential(user, credential)
      .then(() => {
        fetchSignInMethodsForEmail(auth, newEmail)
          .then((result) => {
            if (result.length > 0) {
              Alert.alert('新しいメールアドレスはすでに使われています。')
              setVisible(false)
            } else {
              verifyBeforeUpdateEmail(user, newEmail)
                .then(async () => {
                  Alert.alert('新しいメールアドレスにメールを送信しました', '24時間以内にメールを認証し、再ログインしてください', [
                    {
                      text: 'OK',
                      onPress: () => {
                        signOut(auth)
                          .then(() => {
                            while (router.canGoBack()) {
                              router.back()
                            }
                            router.replace('/auth/loginMail')
                          })
                          .catch(() => {
                            Alert.alert('エラー')
                            setVisible(false)
                          })
                      }
                    }
                  ])
                })
                .catch((error: any) => {
                  console.log(error)
                  Alert.alert('メールアドレスの送信に失敗しました。')
                  setVisible(false)
                })
            }
          })
          .catch(() => {
            Alert.alert('メールアドレスを正しく入力してください')
          })
      })
      .catch(() => {
        Alert.alert('パスワードが違います')
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
          <Text>認証用パスワード</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize='none'
            secureTextEntry
            value={password}
            onChangeText={(value) => { setPassword(value) }}
            >
          </TextInput>
        </View>
        <View style={styles.trans}>
          <TouchableOpacity style={styles.transLink} onPress={resetPass}>
            <Text style={styles.transLinkText}>パスワードを忘れた場合</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <LandscapeButton onPress={() => { void handlePress() }} >変更</LandscapeButton>
        </View>
        {visible && <ActivityIndicator style={styles.active}/>}
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
  active: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
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
  },
  trans: {
    marginTop: 60,
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

export default editEmail
