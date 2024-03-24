import { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'

// firebase
import { auth, db } from '../../config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

// types
import { type Parts, type FirebaseTraining } from '../types/Training'

// components
import { PartsItem } from '../../components/PartsItem'
import { FormData } from '../../components/FormData'

interface Props {
  date: string
}

const Training = (props: Props): JSX.Element => {
  const { date } = props
  const [trainingData, setTrainingData] = useState<Parts[]>([])
  useEffect(() => {
    if (auth.currentUser === null) return
    const ref = collection(db, `users/${auth.currentUser.uid}/training`)
    const q = query(ref, where('date', '==', date))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const getTraining: FirebaseTraining[] = []
      snapshot.forEach((doc) => {
        const { parts, events, set, weight } = doc.data()
        getTraining.push({
          id: doc.id,
          parts,
          events,
          set,
          weight
        })
      })
      setTrainingData(FormData(getTraining))
    })
    return unsubscribe
  }, [date])

  return (
    <View style={styles.container}>
      {(trainingData?.length > 0)
        ? (
          <FlatList
           data={trainingData}
           renderItem={({ item }) => <PartsItem data={item} date={date}/>}
          />
          )
        : (
          <View style={styles.nonData}><Text>データなし</Text></View>
          )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nonData: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 30,
    borderRadius: 5,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Training
