import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'

// firebase
import { auth, db } from '../../config'
import { doc, onSnapshot } from 'firebase/firestore'

// types
import { type UserInfo } from '../types/UserInfo'

// components
import { formDate, pfcPercent, pfcTitle } from '../../components/Calc'

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
        <TouchableOpacity style={styles.editButton} onPress={() => { router.push('edit/editGoal') }}>
          <Feather name='edit' size={22} />
        </TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>目標体重</Text>
          <Text>{data?.goalWeight !== undefined && data?.goalWeight !== '' ? `${data?.weight ?? '未設定'} → ${data.goalWeight} kg` : '未設定'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>目標摂取カロリー</Text>
          <Text>{data?.goalKcal !== undefined && data?.goalKcal !== 0 ? `${data?.goalKcal} kcal/日` : '未設定'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>開始日</Text>
          <Text>{data?.startDate !== undefined && data?.startDate != null ? formDate(data?.startDate.toDate()) : '未設定'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>終了日</Text>
          <Text>{data?.endDate !== undefined && data?.endDate != null ? formDate(data?.endDate.toDate()) : '未設定'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>PFC</Text>
          <View style={styles.itemValue}>
            <Text>{pfcTitle(data?.pfc ?? '')}</Text>
            <Text style={styles.itemValueSub}>{pfcPercent(data?.pfc ?? '')}</Text>
          </View>
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
  },
  itemValue: {
    alignItems: 'flex-end'
  },
  itemValueSub: {
    marginTop: 10
  }
})

export default GoalSetting
