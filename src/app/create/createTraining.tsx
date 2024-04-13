// react
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'

// navigator
import { router, useLocalSearchParams, useNavigation } from 'expo-router'

// compnents
import { OblongButton } from '../../components/OblongButton'

// firebase
import { auth, db } from '../../config'
import { Timestamp, addDoc, collection, getDocs } from 'firebase/firestore'

// data
import { eventMenu, partsMenu } from '../../data/TrainingMenu'

// other
import { Dropdown } from 'react-native-element-dropdown'

interface Props {
  label: string
}

const handlePress = async (date: string, parts: string, events: string, weight: string, set: string): Promise<void> => {
  if (auth.currentUser === null) { return }
  if ((parts === '' || events === '' || weight === '' || set === '')) {
    Alert.alert('未入力事項があります')
  } else if (Number(weight) > 999) {
    Alert.alert('正しい重量を入力してください')
  } else if (Number(set) > 999) {
    Alert.alert('正しい回数を入力してください')
  } else {
    const ref = collection(db, `users/${auth.currentUser.uid}/training`)
    try {
      await addDoc(ref, {
        date,
        parts,
        events,
        weight,
        set,
        createDate: Timestamp.now()
      })
      router.back()
      router.replace('home/training')
    } catch {
      Alert.alert('情報に誤りがあります')
    }
  }
}

const CreateTraining = (): JSX.Element | null => {
  const navigation = useNavigation()

  const date = String(useLocalSearchParams().date)
  const parts = String(useLocalSearchParams().parts)
  const events = String(useLocalSearchParams().events)
  if (typeof date !== 'string') { return null }
  const [partsValue, setPartsValue] = useState<string>(parts ?? '')
  const [eventsValue, setEventsValue] = useState<string>(events ?? '')
  const [weightValue, setWeightValue] = useState<string>('')
  const [setValue, setSetValue] = useState<string>('')
  const [chestMenu, setChestMenu] = useState<Props[]>([])
  const [backMenu, setBackMenu] = useState<Props[]>([])
  const [shoulderMenu, setShoulderMenu] = useState<Props[]>([])
  const [armMenu, setArmMenu] = useState<Props[]>([])
  const [absMenu, setAbsMenu] = useState<Props[]>([])
  const [legMenu, setLegMenu] = useState<Props[]>([])
  const [otherMenu, setOtherMenu] = useState<Props[]>([])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${date}`
    })
  }, [])

  useEffect(() => {
    if (auth.currentUser === null) return
    const ref = collection(db, `users/${auth.currentUser.uid}/data`)
    const chest: Props[] = []
    const back: Props[] = []
    const shoulder: Props[] = []
    const arm: Props[] = []
    const abs: Props[] = []
    const leg: Props[] = []
    const other: Props[] = []
    getDocs(ref)
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const { parts, event } = doc.data()
          if (parts === '胸') {
            chest.push({ label: event })
          } else if (parts === '背中') {
            back.push({ label: event })
          } else if (parts === '肩') {
            shoulder.push({ label: event })
          } else if (parts === '腕') {
            arm.push({ label: event })
          } else if (parts === '腹筋') {
            abs.push({ label: event })
          } else if (parts === '足') {
            leg.push({ label: event })
          } else if (parts === 'その他') {
            other.push({ label: event })
          }
          setChestMenu(chest)
          setBackMenu(back)
          setShoulderMenu(shoulder)
          setArmMenu(arm)
          setAbsMenu(abs)
          setLegMenu(leg)
          setOtherMenu(other)
        })
      })
      .catch(() => {})
  }, [])

  const myMenu = (partsValue: string): Props[] => {
    if (partsValue === '胸') {
      return chestMenu
    } else if (partsValue === '背中') {
      return backMenu
    } else if (partsValue === '肩') {
      return shoulderMenu
    } else if (partsValue === '腕') {
      return armMenu
    } else if (partsValue === '腹筋') {
      return absMenu
    } else if (partsValue === '足') {
      return legMenu
    } else if (partsValue === 'その他') {
      return otherMenu
    }
    return []
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View style={styles.container}>
        <View style={styles.contents}>

          <View style={styles.items}>
            <Text style={styles.itemText}>部位</Text>
            <View style={styles.itemInput}>
              <Dropdown
                data={partsMenu()}
                maxHeight={250}
                labelField="label"
                valueField="label"
                placeholder={'部位を選択'}
                placeholderStyle={{ color: '#B8B8B8' }}
                value={partsValue}
                onChange={({ label }) => {
                  setPartsValue(label)
                }}
              />
            </View>
          </View>

          <View style={styles.items}>
            <Text style={styles.itemText}>種目</Text>
            <View style={styles.itemInput}>
              <Dropdown
                data={myMenu(partsValue).concat(eventMenu(partsValue))}
                maxHeight={250}
                labelField="label"
                valueField="label"
                placeholder={'種目を選択'}
                placeholderStyle={{ color: '#B8B8B8' }}
                value={eventsValue}
                onChange={({ label }) => {
                  setEventsValue(label)
                }}
              />
            </View>
          </View>

          <View style={styles.items}>
            <Text style={styles.itemText}>重量</Text>
            <TextInput
              style={styles.itemInput}
              placeholder='重量'
              autoCapitalize='none'
              keyboardType='number-pad'
              value={weightValue}
              onChangeText={(value) => { setWeightValue(value) }}
            >
            </TextInput>
          </View>

          <View style={styles.items}>
            <Text style={styles.itemText}>回数</Text>
            <TextInput
              style={styles.itemInput}
              placeholder='回数'
              autoCapitalize='none'
              keyboardType='number-pad'
              value={setValue}
              onChangeText={(value) => { setSetValue(value) }}
            >
            </TextInput>
          </View>

          <OblongButton
            style={{ marginVertical: 40 }}
            onPress={() => { void handlePress(date, partsValue, eventsValue, weightValue, setValue) }}>
            登録
          </OblongButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  }
})

export default CreateTraining
