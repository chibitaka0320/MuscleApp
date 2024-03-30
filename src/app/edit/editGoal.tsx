// react
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Dropdown } from 'react-native-element-dropdown'

// navigator
import { router } from 'expo-router'

// firebase
import { auth, db } from '../../config'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// components
import { LandscapeButton } from '../../components/LandscapeButton'
import { calcGoalKcal, formDate, pfcPercent } from '../../components/Calc'

// data
import { PFCMenu } from '../../data/UserMenu'
import { type UserInfo } from '../types/UserInfo'

const handlePress = async (
  userName: string,
  height: string,
  weight: string,
  birthday: Date,
  gender: string,
  activeLevel: string,
  basalMetabo: number,
  totalConsumed: number,
  goalWeight: string,
  startDate: Date,
  endDate: Date,
  pfc: string): Promise<void> => {
  if (auth.currentUser === null) { return }
  const userDoc = doc(db, `users/${auth.currentUser.uid}`)
  const goalKcal = calcGoalKcal(totalConsumed, startDate, endDate, weight, goalWeight)
  try {
    await setDoc(userDoc, {
      userName,
      height,
      weight,
      birthday: !Number.isNaN(birthday.valueOf()) ? birthday : null,
      gender,
      activeLevel,
      basalMetabo,
      totalConsumed,
      goalWeight,
      startDate: !Number.isNaN(startDate.valueOf()) ? startDate : null,
      endDate: !Number.isNaN(endDate.valueOf()) ? endDate : null,
      pfc,
      goalKcal
    })
    router.back()
  } catch {
    Alert.alert('情報に誤りがあります')
  }
}

const EditGoal = (): JSX.Element | null => {
  const [userName, setUserName] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [birthday, setBirthday] = useState<Date>(new Date(''))
  const [gender, setGender] = useState<string>('')
  const [activeLevel, setActiveLevel] = useState<string>('')
  const [basalMetabo, setBasalMetabo] = useState<number>(0)
  const [totalConsumed, setTotalConsumed] = useState<number>(0)
  const [goalWeight, setGoalWeight] = useState<string>('')
  const [startDate, setStartDate] = useState<Date>(new Date(''))
  const [endDate, setEndDate] = useState<Date>(new Date(''))
  const [pfc, setPfc] = useState<string>('')
  const [startPicker, setStartPicker] = useState<boolean>(false)
  const [endPicker, setEndPicker] = useState<boolean>(false)

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (auth.currentUser === null) return
      const userDoc = doc(db, `users/${auth.currentUser.uid}`)
      const snapshot = await getDoc(userDoc)
      const userInfo = snapshot.data() as UserInfo
      setUserName(userInfo?.userName ?? '')
      setHeight(userInfo?.height ?? '')
      setWeight(userInfo?.weight ?? '')
      setBirthday(userInfo?.birthday?.toDate() ?? new Date(''))
      setGender(userInfo?.gender ?? '')
      setActiveLevel(userInfo?.activeLevel ?? '')
      setBasalMetabo(userInfo?.basalMetabo ?? 0)
      setTotalConsumed(userInfo?.totalConsumed ?? 0)
      setGoalWeight(userInfo?.goalWeight ?? '')
      setStartDate(userInfo?.startDate?.toDate() ?? new Date(''))
      setEndDate(userInfo?.endDate?.toDate() ?? new Date(''))
      setPfc(userInfo?.pfc ?? '')
    }
    void fetch()
  }, [])

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <View style={styles.contents}>

          <View style={styles.items}>
            <Text style={styles.itemText}>目標体重</Text>
            <TextInput
              style={styles.itemInput}
              placeholder='未設定'
              autoCapitalize='none'
              value={goalWeight}
              onChangeText={(value) => { setGoalWeight(value) }}
              keyboardType='decimal-pad'
            >
            </TextInput>
          </View>

          <View style={styles.items}>
            <Text style={styles.itemText}>開始日</Text>
            <TextInput
              style={styles.itemInput}
              editable={false}
              placeholder='未設定'
              autoCapitalize='none'
              value={formDate(startDate)}
              onPressIn={() => { setStartPicker(true) }}
            >
            </TextInput>
            <DateTimePickerModal
              date={!Number.isNaN(startDate.valueOf()) ? startDate : new Date()}
              isVisible={startPicker}
              mode='date'
              onConfirm={(date) => {
                setStartDate(date)
                setStartPicker(false)
              }}
              onCancel={() => { setStartPicker(false) }}
            />
          </View>

          <View style={styles.items}>
            <Text style={styles.itemText}>終了日</Text>
            <TextInput
              style={styles.itemInput}
              editable={false}
              placeholder='未設定'
              autoCapitalize='none'
              value={formDate(endDate)}
              onPressIn={() => { setEndPicker(true) }}
            >
            </TextInput>
            <DateTimePickerModal
              date={!Number.isNaN(endDate.valueOf()) ? endDate : new Date()}
              isVisible={endPicker}
              mode='date'
              onConfirm={(date) => {
                setEndDate(date)
                setEndPicker(false)
              }}
              onCancel={() => { setEndPicker(false) }}
            />
          </View>

          <View style={styles.items}>
            <Text style={styles.itemText}>PFCバランス</Text>
            <View style={styles.itemInput}>
              <Dropdown
                data={PFCMenu()}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder={'PFCバランスを選択'}
                placeholderStyle={{ color: '#B8B8B8' }}
                value={pfc}
                onChange={({ value }) => {
                  setPfc(value)
                }}
              />
            </View>
            <Text style={styles.itemInputSub}>{pfcPercent(pfc)}</Text>
          </View>

          <View style={styles.buttons}>
            <LandscapeButton
              onPress={() => {
                void handlePress(
                  userName,
                  height,
                  weight,
                  birthday,
                  gender,
                  activeLevel,
                  basalMetabo,
                  totalConsumed,
                  goalWeight,
                  startDate,
                  endDate,
                  pfc)
              }}>
              保存
            </LandscapeButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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
    height: 40,
    justifyContent: 'center'
  },
  itemInputValue: {
    fontSize: 16
  },
  itemInputSub: {
    marginTop: 10,
    paddingLeft: 10
  },
  buttons: {
    marginVertical: 20,
    alignItems: 'center'
  }
})

export default EditGoal
