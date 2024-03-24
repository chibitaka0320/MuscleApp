import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useEffect, useState } from 'react'

// firebase

import { auth, db } from '../../config'
import { doc, onSnapshot } from 'firebase/firestore'

// types
import { type UserInfo } from '../types/UserInfo'

const GoalSetting = (): JSX.Element => {
  const [data, setData] = useState<UserInfo>({})
  useEffect(() => {
    if (auth.currentUser === null) return
    const userDoc = doc(db, `users/${auth.currentUser.uid}`)
    const unsubscribe = onSnapshot(userDoc, (snapshot) => {
      const getData = snapshot.data() as UserInfo
      setData(getData)
    })
    return unsubscribe
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <TouchableOpacity style={styles.editButton}>
          <Feather name='edit' size={22} />
        </TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>目標体重</Text>
          <Text>{data?.weight} → 55.0 kg</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>目標摂取カロリー</Text>
          <Text>1800 kcal/日</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>開始日</Text>
          <Text>2024年 03月 20日</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>終了日</Text>
          <Text>2024年 06月 29日</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>PFC</Text>
          <Text>P:40%  F:20%  C:40%</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  contents: {
    flex: 1,
    margin: 40
  },
  editButton: {
    alignItems: 'flex-end',
    marginBottom: 5
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15
  },
  itemTitle: {
    fontSize: 15
  }
})

export default GoalSetting
