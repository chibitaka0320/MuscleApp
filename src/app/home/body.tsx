import { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ImageModal from 'react-native-image-modal'

// fireabse
import { auth, db } from '../../config'
import { doc, onSnapshot } from 'firebase/firestore'

// types
import { type BodyUrl } from '../types/Body'

interface Props {
  date: string
}

const Body = (props: Props): JSX.Element => {
  const { date } = props
  const [front, setFront] = useState<string>('')
  const [back, setBack] = useState<string>('')

  useEffect(() => {
    if (auth.currentUser === null) return
    const bodyDoc = doc(db, `users/${auth.currentUser.uid}/body/${date}`)
    const unsubscribe = onSnapshot(bodyDoc, (snapshot) => {
      const getUrl = snapshot.data() as BodyUrl
      let frontUrl = ''
      let backUrl = ''
      if (getUrl?.front !== undefined) {
        frontUrl = getUrl.front
      }
      if (getUrl?.back !== undefined) {
        backUrl = getUrl.back
      }
      setFront(frontUrl)
      setBack(backUrl)
    })
    return unsubscribe
  }, [date])

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View>
          <Text style={styles.title}>FRONT</Text>
          {front !== ''
            ? <ImageModal
              style={styles.image}
              source={{ uri: front }}
              modalImageStyle={styles.modalImage}
            />
            : <ImageModal
              resizeMode='center'
              disabled
              style={styles.image}
              source={require('../../data/noimage.jpg')}
            />
          }
        </View>
        <View style={styles.bar}></View>
        <View>
          <Text style={styles.title}>BACK</Text>
          {back !== ''
            ? <ImageModal
              style={styles.image}
              source={{ uri: back }}
              modalImageStyle={styles.modalImage}
            />
            : <ImageModal
            resizeMode='center'
              disabled
              style={styles.image}
              source={require('../../data/noimage.jpg')}
            />
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 30,
    borderRadius: 5,
    height: 280,
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
    height: 230,
    width: 175
  },
  modalImage: {
    resizeMode: 'contain'
  }
})

export default Body
