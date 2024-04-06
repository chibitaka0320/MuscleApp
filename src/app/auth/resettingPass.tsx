import { router } from 'expo-router'
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'

// firebase
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../config'

// components
import { OblongButton } from '../../components/OblongButton'

const handlePress = (email: string): void => {
  if (email === '') {
    Alert.alert('メールアドレスを入力してください')
  } else {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('再設定メールを送信しました。', '', [
          {
            text: 'OK',
            onPress: () => {
              router.back()
            }
          }
        ])
      })
      .catch((error: any) => {
        console.log(error)
        Alert.alert('メールアドレスを正しく入力してください')
      })
  }
}

const ResettingPass = (): JSX.Element => {
  const [email, setEmail] = useState<string>('')
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
          <OblongButton style={{ marginVertical: 40 }} onPress={() => { handlePress(email) }}>
            再設定メールを送信
          </OblongButton>
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

export default ResettingPass
