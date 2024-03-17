import { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'

// firebase
import { auth, db } from '../../config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

// types
import { type EatingSumData, type EatingData } from '../types/Eating'

// components
import CalorieGraph from '../../components/CalorieGraph'
import { calcCarboGram, calcFatGram, calcProteinGram } from '../../components/Calc'

interface Props {
  date: string
}

const FONTSIZE = 13

const Eating = (props: Props): JSX.Element => {
  const { date } = props
  const [eatData, setEatData] = useState<EatingData[]>([])
  const [eatSumData, setEatSumData] = useState<EatingSumData>({ total: 0, protein: 0, fat: 0, carbo: 0 })
  useEffect(() => {
    if (auth.currentUser === null) return
    const ref = collection(db, `users/${auth.currentUser.uid}/eating`)
    const q = query(ref, where('date', '==', date))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const getEating: EatingData[] = []
      let sumTotal = 0
      let sumProtein = 0
      let sumFat = 0
      let sumCarbo = 0
      snapshot.forEach((doc) => {
        const { name, total, protein, fat, carbo } = doc.data() as EatingData
        getEating.push({
          id: doc.id,
          name,
          total,
          protein,
          fat,
          carbo
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.item}>
        <CalorieGraph data={eatSumData}/>
      </View>
      <View style={styles.item}>
        {(eatData?.length > 0)
          ? (
              <FlatList
                data={eatData}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.eatContent}>
                    <Text style={styles.content}>{item.name}</Text>
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
    marginVertical: 6
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
    width: '35%',
    fontSize: FONTSIZE
  },
  total: {
    width: '23%',
    fontSize: FONTSIZE
  },
  protein: {
    width: '14%',
    fontSize: FONTSIZE
  },
  fat: {
    width: '14%',
    fontSize: FONTSIZE
  },
  carbo: {
    width: '14%',
    fontSize: FONTSIZE
  }
})

export default Eating
