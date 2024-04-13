// react
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider'

// navigator
import { router, useLocalSearchParams, useNavigation } from 'expo-router'

// compnents
import { calcCarboGram, calcFatGram, calcKcal, calcProteinGram } from '../../components/Calc'

// firebase
import { auth, db } from '../../config'
import { Timestamp, deleteDoc, doc, setDoc } from 'firebase/firestore'

const onUpdate = async (
  id: string,
  date: string,
  name: string,
  total: string,
  protein: number,
  fat: number,
  carbo: number,
  createDate: Timestamp): Promise<void> => {
  if (auth.currentUser === null) { return }
  if (name === '') {
    Alert.alert('食事名を入力してください')
  } else if (total === '') {
    Alert.alert('総カロリーを入力してください')
  } else if (protein + fat + carbo !== 100) {
    Alert.alert('合計を100%にしてください')
  } else {
    try {
      const editDoc = doc(db, `users/${auth.currentUser.uid}/eating`, id)
      await setDoc(editDoc, {
        date,
        name,
        total,
        protein,
        fat,
        carbo,
        createDate
      })
      router.back()
      router.replace('home/eating')
    } catch {
      Alert.alert('情報に誤りがあります')
    }
  }
}

const onDelete = (id: string): void => {
  if (auth.currentUser === null) { return }
  const delDoc = doc(db, `users/${auth.currentUser.uid}/eating`, id)
  Alert.alert('記録を削除します', 'よろしいですか', [
    {
      text: 'キャンセル'
    },
    {
      text: '削除する',
      style: 'destructive',
      onPress: (): void => {
        const fetch = async (): Promise<void> => {
          await deleteDoc(delDoc)
        }
        void fetch()
        router.back()
        router.replace('home/eating')
      }
    }
  ])
}

const onSlider = (total: string): void => {
  if (total === '') {
    Alert.alert('総カロリーを入力してください')
  }
}

const EditEat = (): JSX.Element | null => {
  const navigation = useNavigation()

  const getName = String(useLocalSearchParams().name)
  const getTotal = String(useLocalSearchParams().total)
  const protein = Number(useLocalSearchParams().protein)
  const fat = Number(useLocalSearchParams().fat)
  const carbo = Number(useLocalSearchParams().carbo)
  const id = String(useLocalSearchParams().id)
  const date = String(useLocalSearchParams().date)
  const createDate = Timestamp.fromDate(new Date(String(useLocalSearchParams().createDate)))

  const [name, setName] = useState<string>(getName)
  const [total, setTotal] = useState<string>(getTotal)
  const [proteinPer, setProteinPer] = useState<number>(protein)
  const [fatPer, setFatPer] = useState<number>(fat)
  const [carboPer, setCarboPer] = useState<number>(carbo)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${date}`
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.contents}>

        <View style={styles.items}>
          <Text style={styles.itemText}>食事名</Text>
          <TextInput
            style={styles.itemInput}
            placeholder='食事名'
            autoCapitalize='none'
            value={name}
            onChangeText={(value) => { setName(value) }}
          >
          </TextInput>
        </View>

        <View style={styles.items}>
          <Text style={styles.itemText}>総カロリー</Text>
          <TextInput
            style={styles.itemInput}
            placeholder='総カロリー'
            autoCapitalize='none'
            keyboardType='number-pad'
            value={total}
            onChangeText={(value) => {
              setTotal(value)
            }}
          >
          </TextInput>
        </View>

        <View style={styles.items}>
          <View style={styles.slideTop}>
            <Text style={styles.itemText}>タンパク質</Text>
            <View style={styles.slideTopRight}>
              <Text>{calcProteinGram(total, proteinPer)} g</Text>
              <Text>{calcKcal(total, proteinPer)} kcal</Text>
            </View>
          </View>
          <View style={styles.slideBottom}>
            <Text style={styles.slidePer}>{proteinPer} %</Text>
            <TouchableOpacity
              onPressIn={() => { onSlider(total) }}
              style={styles.sliderStyle}
            >
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#63B0F2"
                disabled={total === ''}
                onValueChange={(value) => {
                  setProteinPer(value)
                }}
                upperLimit={100 - (fatPer + carboPer)}
                value={protein}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.items}>
          <View style={styles.slideTop}>
            <Text style={styles.itemText}>脂質</Text>
            <View style={styles.slideTopRight}>
              <Text>{calcFatGram(total, fatPer)} g</Text>
              <Text>{calcKcal(total, fatPer)} kcal</Text>
            </View>
          </View>
          <View style={styles.slideBottom}>
            <Text style={styles.slidePer}>{fatPer} %</Text>
            <TouchableOpacity
              onPressIn={() => { onSlider(total) }}
              style={styles.sliderStyle}
            >
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#63B0F2"
                disabled={total === ''}
                onValueChange={(value) => {
                  setFatPer(value)
                }}
                upperLimit={100 - (proteinPer + carboPer)}
                value={fat}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.items}>
          <View style={styles.slideTop}>
            <Text style={styles.itemText}>炭水化物</Text>
            <View style={styles.slideTopRight}>
              <Text>{calcCarboGram(total, carboPer)} g</Text>
              <Text>{calcKcal(total, carboPer)} kcal</Text>
            </View>
          </View>
          <View style={styles.slideBottom}>
            <Text style={styles.slidePer}>{carboPer} %</Text>
            <TouchableOpacity
              onPressIn={() => { onSlider(total) }}
              style={styles.sliderStyle}
            >
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#63B0F2"
                disabled={total === ''}
                onValueChange={(value) => {
                  setCarboPer(value)
                }}
                upperLimit={100 - (proteinPer + fatPer)}
                value={carbo}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.update}
            onPress={() => { void onUpdate(id, date, name, total, proteinPer, fatPer, carboPer, createDate) }}
          >
            <Text>更新</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => { onDelete(id) }}
          >
            <Text>削除</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contents: {
    flex: 1,
    margin: 30
  },
  items: {
    marginBottom: 25
  },
  itemText: {
    marginBottom: 10,
    fontWeight: 'bold'
  },
  itemInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEDDDC',
    borderRadius: 3,
    fontSize: 16,
    paddingHorizontal: 10,
    height: 40
  },
  slideTop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  slideTopRight: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-around'
  },
  slideBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10
  },
  slidePer: {
    width: '15%'
  },
  sliderStyle: {
    width: '75%'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 40,
    marginHorizontal: 15
  },
  delete: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEDDDC',
    marginVertical: 15,
    borderRadius: 5,
    height: 50,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  update: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEDDDC',
    marginVertical: 15,
    borderRadius: 5,
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default EditEat
