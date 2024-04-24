import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native'
import ImageModal from 'react-native-image-modal'

// fireabse
import { auth, db } from '../../config'
import { doc, onSnapshot } from 'firebase/firestore'

// types
import { type BodyUrl } from '../types/Body'

interface Props {
  date: string
}

const imageWidth = Dimensions.get('screen').width / 2.4
const imageHeight = Dimensions.get('screen').height / 2.6

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
    <ScrollView style={styles.container}>
      <View style={styles.contents}>
        <View style={styles.items}>
          <View style={styles.item}>
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
          <View style={styles.item}>
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contents: {
    flex: 1,
    margin: 15
  },
  items: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: imageHeight,
    padding: 5
  },
  item: {
    width: imageWidth,
    height: '95%',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5
  },
  image: {
    height: '97%',
    width: imageWidth
  },
  bar: {
    height: '90%',
    width: 1,
    backgroundColor: '#DEDDDC'
  },
  modalImage: {
    resizeMode: 'contain'
  }
})

export default Body
