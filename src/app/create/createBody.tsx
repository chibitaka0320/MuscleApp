import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActionSheetIOS, ActivityIndicator, Dimensions } from 'react-native'
import { launchImageLibraryAsync } from 'expo-image-picker'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'

// components
import { OblongButton } from '../../components/OblongButton'
import { getExtention } from '../../components/File'

// firebase
import { auth, db } from '../../config'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// types
import { type BodyUrl } from '../types/Body'

const imageWidth = Dimensions.get('screen').width / 2.4
const imageHeight = Dimensions.get('screen').height / 2.6

const CreateBody = (): JSX.Element | null => {
  const [visible, setVisible] = useState<boolean>(false)
  const storage = getStorage()
  const navigation = useNavigation()
  const { date } = useLocalSearchParams()
  const [front, setFront] = useState<string>('')
  const [back, setBack] = useState<string>('')
  const [preFront, setPreFront] = useState<string>('')
  const [preBack, setPreBack] = useState<string>('')

  if (typeof date !== 'string') { return null }
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${date}`
    })
  }, [])

  useEffect(() => {
    if (auth.currentUser === null) return
    const bodyDoc = doc(db, `users/${auth.currentUser.uid}/body/${date}`)
    getDoc(bodyDoc)
      .then((snapshot) => {
        const getUrl = snapshot.data() as BodyUrl
        if (getUrl?.front !== undefined) {
          setFront(getUrl.front)
        }
        if (getUrl.back !== undefined) {
          setBack(getUrl.back)
        }
      })
      .catch(() => {})
  }, [])

  const onFront = (): void => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['キャンセル', '追加', '削除'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          void frontImage()
        } else if (buttonIndex === 2) {
          setPreFront(front)
          setFront('')
        }
      }
    )
  }

  const frontImage = async (): Promise<void> => {
    const result = await launchImageLibraryAsync({
      aspect: [16, 9],
      allowsEditing: true
    })
    if (!result.canceled) {
      setFront(result.assets[0].uri)
    }
  }

  const onBack = (): void => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['キャンセル', '追加', '削除'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          void backImage()
        } else if (buttonIndex === 2) {
          setPreBack(back)
          setBack('')
        }
      }
    )
  }

  const backImage = async (): Promise<void> => {
    const result = await launchImageLibraryAsync({
      aspect: [16, 9],
      allowsEditing: true
    })
    if (!result.canceled) {
      setBack(result.assets[0].uri)
    }
  }

  const uploadImage = async (uri: string, path: string): Promise<string> => {
    try {
      const storageRef = ref(storage, path)
      const localUri = await fetch(uri)
      const blob = await localUri.blob()
      const snapshot = await uploadBytes(storageRef, blob)
      const fullPath = snapshot.ref.fullPath
      const downloadUrl = await getDownloadURL(ref(storage, fullPath))
      return downloadUrl
    } catch (error: any) {
      console.log(error)
      throw error
    }
  }

  const onPress = async (): Promise<void> => {
    setVisible(true)
    let frontUrl = front
    let backUrl = back
    if (auth.currentUser === null) return
    const uid = auth.currentUser.uid
    try {
      if (front !== '' && front.substring(0, 4) === 'file') {
        const frontExt = getExtention(front)
        const frontPath = `body/${uid}/${date}/front.${frontExt}`
        frontUrl = await uploadImage(front, frontPath)
      } else if (front === '' && preFront.substring(0, 5) === 'https') {
        const path = `body/${uid}/${date}/front.jpg`
        const desertRef = ref(storage, path)
        deleteObject(desertRef)
          .then(() => {})
          .catch((error: any) => {
            console.log(error)
            throw error
          })
      }

      if (back !== '' && back.substring(0, 4) === 'file') {
        const backExt = getExtention(back)
        const backPath = `body/${uid}/${date}/back.${backExt}`
        backUrl = await uploadImage(back, backPath)
      } else if (back === '' && preBack.substring(0, 5) === 'https') {
        const path = `body/${uid}/${date}/back.jpg`
        const desertRef = ref(storage, path)
        deleteObject(desertRef)
          .then(() => {})
          .catch((error: any) => {
            console.log(error)
            throw error
          })
      }

      const bodyDoc = doc(db, `users/${uid}/body/${date}`)
      await setDoc(bodyDoc, {
        front: frontUrl,
        back: backUrl
      })
      Alert.alert('画像をアップロードしました', '', [
        {
          text: 'OK',
          onPress: () => {
            router.back()
          }
        }
      ])
    } catch {
      Alert.alert('アップロードに失敗しました')
    }
    setVisible(true)
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.item}>
          <View>
            <Text style={styles.title}>FRONT</Text>
            <TouchableOpacity onPress={() => { onFront() }}>
              {front === ''
                ? <Image
              resizeMode='center'
              style={styles.image}
              source={require('../../data/plus.png')}
              />
                : <Image
                style={styles.image}
                source={{ uri: front }}
              />}
            </TouchableOpacity>
          </View>
          <View style={styles.bar}></View>
          <View>
            <Text style={styles.title}>BACK</Text>
            <TouchableOpacity onPress={() => { onBack() }}>
              {back === ''
                ? <Image
              resizeMode='center'
              style={styles.image}
              source={require('../../data/plus.png')}
              />
                : <Image
                style={styles.image}
                source={{ uri: back }}
              />}
            </TouchableOpacity>
          </View>
        </View>
        <OblongButton
          style={{ marginVertical: 40 }}
          onPress={() => { void onPress() }}
          >
          保存
        </OblongButton>
      </View>
      {visible && <ActivityIndicator style={styles.active}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  active: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginTop: 60,
    marginBottom: 30,
    borderRadius: 5,
    height: imageHeight,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bar: {
    marginTop: 22,
    height: '86%',
    width: 1,
    backgroundColor: '#DEDDDC'
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  image: {
    height: '97%',
    width: imageWidth
  },
  modalImage: {
    resizeMode: 'contain'
  }
})

export default CreateBody
