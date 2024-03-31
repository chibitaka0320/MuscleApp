import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons'

// types
import { type UserInfo } from '../types/UserInfo'

// firebase
import { auth, db } from '../../config'
import { doc, onSnapshot } from 'firebase/firestore'

// components
import { calcActiveLevel, calcAge, calcGender } from '../../components/Calc'

const ProfSetting = (): JSX.Element => {
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
        <TouchableOpacity style={styles.editButton} onPress={() => { router.push('edit/editProf') }}>
          <Feather name='edit' size={22} />
        </TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>ユーザー名</Text>
          <Text>{data?.userName !== undefined && data?.userName !== '' ? data?.userName : '未設定'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>身長</Text>
          <Text>{data?.height !== undefined && data?.height !== '' ? `${data?.height} cm` : '未設定'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>体重</Text>
          <Text>{data?.weight !== undefined && data?.weight !== '' ? `${data?.weight} kg` : '未設定'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>年齢</Text>
          <Text>{data?.birthday !== undefined && data?.birthday != null ? `${calcAge(data?.birthday)} 歳` : '未設定'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>性別</Text>
          <Text>{data?.gender !== undefined && data?.gender !== '' ? calcGender(data?.gender) : '未設定'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>活動レベル</Text>
          <Text>{calcActiveLevel(data?.activeLevel)}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>基礎代謝</Text>
          <Text>
            {data?.basalMetabo !== undefined && data?.basalMetabo !== 0
              ? `${data?.basalMetabo} kcal`
              : '計算不可(未設定項目あり)'
            }
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>総消費カロリー</Text>
          <Text>
            {data?.totalConsumed !== undefined && data?.totalConsumed !== 0
              ? `${data?.totalConsumed} kcal`
              : '計算不可(未設定項目あり)'
            }
          </Text>
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

export default ProfSetting
