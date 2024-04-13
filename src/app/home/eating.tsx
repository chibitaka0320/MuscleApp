import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { router } from 'expo-router'

// firebase
import { auth, db } from '../../config'
import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'

// types
import { type EatingSumData, type EatingData, type EatingGoalPFC } from '../types/Eating'
import { type UserInfo } from '../types/UserInfo'

// components
import CalorieGraph from '../../components/CalorieGraph'
import { calcCarboGram, calcFatGram, calcGoalPFC, calcProteinGram } from '../../components/Calc'

interface Props {
  date: string
}

const FONTSIZE = 13
const handlePress = (value: EatingData, date: string): void => {
  const { id, name, total, protein, fat, carbo, createDate } = value
  router.push({ pathname: 'edit/editEat', params: { date, id, name, total, protein, fat, carbo, createDate: createDate.toDate() } })
}

const Eating = (props: Props): JSX.Element => {
  const { date } = props
  const [eatData, setEatData] = useState<EatingData[]>([])
  const [eatSumData, setEatSumData] = useState<EatingSumData>({ total: 0, protein: 0, fat: 0, carbo: 0 })
  const [goalKcal, setGoalKcal] = useState<number>(0)
  const [goalPFC, setGoalPFC] = useState<EatingGoalPFC>({ goalProtein: 0, goalFat: 0, goalCarbo: 0 })
  useEffect(() => {
    if (auth.currentUser === null) return
    const ref = collection(db, `users/${auth.currentUser.uid}/eating`)
    const q = query(ref, where('date', '==', date), orderBy('createDate'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const getEating: EatingData[] = []
      let sumTotal = 0
      let sumProtein = 0
      let sumFat = 0
      let sumCarbo = 0
      snapshot.forEach((doc) => {
        const { name, total, protein, fat, carbo, createDate } = doc.data() as EatingData
        getEating.push({
          id: doc.id,
          name,
          total,
          protein,
          fat,
          carbo,
          createDate
        })
        sumTotal += Number(total)
        sumProtein += calcProteinGram(total, protein)
        sumFat += calcFatGram(total, fat)
        sumCarbo += calcCarboGram(total, carbo)
      })
      const getSumEating: EatingSumData = {
        total: sumTotal,
        protein: sumProtein,
        fat: sumFat,
        carbo: sumCarbo
      }
      setEatData(getEating)
      setEatSumData(getSumEating)
    })
    return unsubscribe
  }, [date])

  useEffect(() => {
    if (auth.currentUser === null) return
    const userDoc = doc(db, `users/${auth.currentUser.uid}`)
    const unsubscribe = onSnapshot(userDoc, (snapshot) => {
      if (snapshot.data() !== undefined) {
        const { goalKcal, pfc } = snapshot.data() as UserInfo
        setGoalKcal(goalKcal ?? 0)
        setGoalPFC(calcGoalPFC(goalKcal ?? 0, pfc ?? ''))
      }
    })
    return unsubscribe
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.item}>
        <CalorieGraph data={eatSumData} goalKcal={goalKcal} goalPFC={goalPFC}/>
      </View>
      <View style={[styles.item, { marginBottom: 150 }]}>
        {(eatData?.length > 0)
          ? (
              <FlatList
                data={eatData}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.eatContent} onPress={() => { handlePress(item, date) }}>
                    <Text style={styles.content} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.total}>{item.total} kcal</Text>
                    <Text style={styles.protein}>{calcProteinGram(item.total, item.protein)} g</Text>
                    <Text style={styles.fat}>{calcFatGram(item.total, item.fat)} g</Text>
                    <Text style={styles.carbo}>{calcCarboGram(item.total, item.carbo)} g</Text>
                  </TouchableOpacity>
                )}
                ListHeaderComponent={() => (
                  <View style={[styles.eatContent, styles.header]}>
                    <Text style={[styles.content, styles.headerContent]}>食事</Text>
                    <Text style={[styles.total, styles.headerValue]}>カロリー</Text>
                    <Text style={[styles.protein, styles.headerValue]}>P</Text>
                    <Text style={[styles.fat, styles.headerValue]}>F</Text>
                    <Text style={[styles.carbo, styles.headerValue]}>C</Text>
                  </View>
                )}
                ListFooterComponent={<View style={styles.footer}></View>}
                scrollEnabled={false}
              />
            )
          : (
              <View>
                <View style={[styles.eatContent, styles.header]}>
                  <Text style={[styles.content, styles.headerContent]}>食事</Text>
                  <Text style={[styles.total, styles.headerValue]}>カロリー</Text>
                  <Text style={[styles.protein, styles.headerValue]}>P</Text>
                  <Text style={[styles.fat, styles.headerValue]}>F</Text>
                  <Text style={[styles.carbo, styles.headerValue]}>C</Text>
                </View>
                <View style={styles.nonData}>
                  <Text>データなし</Text>
                </View>
              </View>
            )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginVertical: 30,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 15
  },
  eatContent: {
    flexDirection: 'row',
    paddingVertical: 6
  },
  header: {
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#DEDDDC'
  },
  headerContent: {
    fontWeight: 'bold'
  },
  headerValue: {
    fontWeight: 'bold'
  },
  nonData: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70
  },
  content: {
    marginRight: 8,
    width: '31%',
    fontSize: FONTSIZE
  },
  total: {
    marginRight: 5,
    width: '21%',
    fontSize: FONTSIZE
  },
  protein: {
    marginRight: 5,
    width: '14%',
    fontSize: FONTSIZE
  },
  fat: {
    marginRight: 5,
    width: '14%',
    fontSize: FONTSIZE
  },
  carbo: {
    width: '14%',
    fontSize: FONTSIZE
  },
  footer: {
    height: 300
  }
})

export default Eating
