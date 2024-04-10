import { View, Text, StyleSheet, Alert, TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'

// firebase
import { auth, db } from '../../config'
import { deleteDoc, doc } from 'firebase/firestore'
import { ref, getStorage, listAll, deleteObject } from 'firebase/storage'

// components
import { LandscapeButton } from '../../components/LandscapeButton'
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential } from 'firebase/auth'
import { router } from 'expo-router'
import { useState } from 'react'

const DeleteAccount = (): JSX.Element => {
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const fetchDel = async (): Promise<void> => {
    Alert.alert('アカウントを削除しますか', '', [
      {
        text: 'キャンセル',
        onPress: () => {
          setVisible(false)
        }
      },
      {
        text: '削除',
        style: 'destructive',
        onPress: () => {
          const user = auth.currentUser
          if (user?.email === null || user?.email === undefined) return
          const delDoc = doc(db, 'users', user.uid)
          const storage = getStorage()
          const listRef = ref(storage, `body/${user.uid}`)
          const credential = EmailAuthProvider.credential(user?.email, password)
          const fetch = async (): Promise<void> => {
            // ユーザーデータ削除
            await deleteDoc(delDoc)
              .then(() => { console.log('successFirestoreDel') })
              .catch((error: any) => { console.log(error, 'firestoreDel') })

            // ユーザーストレージ削除
            listAll(listRef)
              .then((res) => {
                res.prefixes.forEach((folderRef) => {
                  const path = folderRef.fullPath
                  const listRef = ref(storage, path)
                  listAll(listRef)
                    .then((res) => {
                      res.items.forEach((item) => {
                        const path = item.fullPath
                        const desertRef = ref(storage, path)
                        console.log(item.fullPath)
                        deleteObject(desertRef)
                          .then(() => { console.log('successStorageDel') })
                          .catch((error: any) => { console.log(error, 'storageDel') })
                      })
                    })
                    .catch((error: any) => { console.log(error, 'storageList') })
                })
              })
              .catch((error: any) => { console.log(error) })

            // ユーザー削除
            deleteUser(user)
              .then(() => {
                while (router.canGoBack()) {
                  router.back()
                }
                router.replace('/auth/signupMail')
              })
              .catch((error: any) => {
                console.log(error)
                Alert.alert('アカウントの削除に失敗しました')
              })
          }
          reauthenticateWithCredential(user, credential)
            .then(() => {
              void fetch()
              console.log('success')
            })
            .catch(() => {
              Alert.alert('パスワードが違います', '', [{ onPress: () => { setVisible(false) } }])
            })
        }
      }
    ])
  }

  const onDelete = (): void => {
    setVisible(true)
    void fetchDel()
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View style={styles.container}>
        <View style={styles.item}>
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
            <LandscapeButton onPress={() => { onDelete() }} visible={visible}>
              アカウントを削除する
            </LandscapeButton>
          </View>
        </View>
        {visible && <ActivityIndicator style={styles.active}/>}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  item: {
    flex: 1
  },
  active: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)'
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
