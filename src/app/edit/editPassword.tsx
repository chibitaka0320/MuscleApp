import { useState } from 'react'
import { StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, View, TouchableOpacity, Alert } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'

// firebase
import { auth } from '../../config'
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth'

// components
import { LandscapeButton } from '../../components/LandscapeButton'

const onUpdate = (A: string, B: string, C: string): void => {
  const user = auth.currentUser
  if (user === null) return
  if (A === '' || B === '' || C === '') {
    Alert.alert('未入力事項があります')
  } else {
    const userMail = user.email
    if (userMail === null) return
    signInWithEmailAndPassword(auth, userMail, A)
      .then(() => {
        if (B === C) {
          updatePassword(user, B).then(() => {
            Alert.alert('パスワードの変更が完了しました', '', [{
              text: 'OK', onPress: () => { router.back() }
            }])
          }).catch(() => {
            Alert.alert('新しいパスワードを正しく入力してください')
          })
        }
      })
      .catch(() => {
        Alert.alert('現在のパスワードに誤りがあります')
      })
  }
}

const EditPassword = (): JSX.Element => {
  const [toggleA, setToggleA] = useState(true)
  const [passwordA, setPasswordA] = useState('')
  const [toggleB, setToggleB] = useState(true)
  const [passwordB, setPasswordB] = useState('')
  const [toggleC, setToggleC] = useState(true)
  const [passwordC, setPasswordC] = useState('')

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View style={styles.container}>
        <View style={styles.item}>
          <TextInput
            style={styles.itemTextInput}
            placeholder='現在のパスワード'
            autoCapitalize='none'
            secureTextEntry={toggleA}
            autoFocus
            value={passwordA}
            onChangeText={(value) => {
              setPasswordA(value)
            }}
            >
          </TextInput>
          <TouchableOpacity onPress={() => { setToggleA(!toggleA) }} style={styles.itemIcon}>
            <FontAwesome6 name={toggleA ? 'eye' : 'eye-slash'} size={22}/>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <TextInput
            style={styles.itemTextInput}
            placeholder='新しいパスワード'
            autoCapitalize='none'
            secureTextEntry={toggleB}
            value={passwordB}
            onChangeText={(value) => {
              setPasswordB(value)
            }}
            >
          </TextInput>
          <TouchableOpacity onPress={() => { setToggleB(!toggleB) }} style={styles.itemIcon}>
            <FontAwesome6 name={toggleB ? 'eye' : 'eye-slash'} size={22}/>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <TextInput
            style={styles.itemTextInput}
            placeholder='新しいパスワードの確認'
            autoCapitalize='none'
            secureTextEntry={toggleC}
            value={passwordC}
            onChangeText={(value) => {
              setPasswordC(value)
            }}
            >
          </TextInput>
          <TouchableOpacity onPress={() => { setToggleC(!toggleC) }} style={styles.itemIcon}>
            <FontAwesome6 name={toggleC ? 'eye' : 'eye-slash'} size={22}/>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <LandscapeButton onPress={() => { onUpdate(passwordA, passwordB, passwordC) }}>パスワードを変更</LandscapeButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEDDDC',
    borderRadius: 3,
    marginVertical: 15
  },
  itemTextInput: {
    fontSize: 16,
    padding: 10,
    width: '85%'
  },
  itemIcon: {
    width: 30,
    alignItems: 'center',
    marginLeft: 10
  },
  button: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 100,
    alignItems: 'center'
  }
})

export default EditPassword
