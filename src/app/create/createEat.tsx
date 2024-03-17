// react
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider'

// navigator
import { router, useLocalSearchParams, useNavigation } from 'expo-router'

// compnents
import { OblongButton } from '../../components/OblongButton'
import { calcCarboGram, calcFatGram, calcKcal, calcProteinGram } from '../../components/Calc'

// firebase
import { auth, db } from '../../config'
import { addDoc, collection } from 'firebase/firestore'

const handlePress = async (date: string, name: string, total: string, protein: number, fat: number, carbo: number): Promise<void> => {
  if (auth.currentUser === null) { return }
  if (name === '') {
    Alert.alert('食事名を入力してください')
  } else if (total === '') {
    Alert.alert('総カロリーを入力してください')
  } else if (protein + fat + carbo !== 100) {
    Alert.alert('合計を100%にしてください')
  } else {
    try {
      const ref = collection(db, `users/${auth.currentUser.uid}/eating`)
      await addDoc(ref, {
        date,
        name,
        total,
        protein,
        fat,
        carbo
      })
      router.back()
      router.replace('home/eating')
    } catch {
      Alert.alert('情報に誤りがあります')
    }
  }
}

const onSlider = (total: string): void => {
  if (total === '') {
    Alert.alert('総カロリーを入力してください')
  }
}

const CreateEat = (): JSX.Element | null => {
  const navigation = useNavigation()
  const { date } = useLocalSearchParams()
  if (typeof date !== 'string') { return null }
  const [name, setName] = useState<string>('')
  const [total, setTotal] = useState<string>('')
  const [proteinPer, setProteinPer] = useState<number>(0)
  const [fatPer, setFatPer] = useState<number>(0)
  const [carboPer, setCarboPer] = useState<number>(0)

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
              />
            </TouchableOpacity>
          </View>
        </View>

        <OblongButton
          style={{ marginVertical: 40 }}
          onPress={() => { void handlePress(date, name, total, proteinPer, fatPer, carboPer) }}
        >
          登録
        </OblongButton>
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
  }
})

export default CreateEat
