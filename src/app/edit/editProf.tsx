// react
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Dropdown } from 'react-native-element-dropdown'

// navigator
import { router } from 'expo-router'

// firebase
import { auth, db } from '../../config'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'

// components
import { LandscapeButton } from '../../components/LandscapeButton'
import { calcBasalMetabo, calcGoalKcal, calcTotalConsumed, formDate } from '../../components/Calc'

// data
import { ActiveMenu, GenderMenu } from '../../data/UserMenu'
import { type UserInfo } from '../types/UserInfo'

const handlePress = async (
  userName: string,
  height: string,
  weight: string,
  birthday: Date,
  gender: string,
  activeLevel: string,
  goalWeight: string,
  startDate: Date,
  endDate: Date,
  pfc: string): Promise<void> => {
  if (auth.currentUser === null) { return }
  const userDoc = doc(db, `users/${auth.currentUser.uid}`)
  const timestampBirth = Timestamp.fromDate(birthday)
  const basalMetabo = calcBasalMetabo(height, weight, timestampBirth, gender)
  const totalConsumed = calcTotalConsumed(basalMetabo, activeLevel)
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

const EditProf = (): JSX.Element | null => {
  const [userName, setUserName] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [birthday, setBirthday] = useState<Date>(new Date(''))
  const [gender, setGender] = useState<string>('')
  const [activeLevel, setActiveLevel] = useState<string>('')
  const [goalWeight, setGoalWeight] = useState<string>('')
  const [startDate, setStartDate] = useState<Date>(new Date(''))
  const [endDate, setEndDate] = useState<Date>(new Date(''))
  const [pfc, setPfc] = useState<string>('')
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)

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
            <Text style={styles.itemText}>ユーザー名</Text>
            <TextInput
              style={styles.itemInput}
              placeholder='未設定'
              autoCapitalize='none'
              value={userName}
              onChangeText={(value) => { setUserName(value) }}
            >
            </TextInput>
          </View>

          <View style={styles.items}>
            <Text style={styles.itemText}>身長</Text>
            <TextInput
              style={styles.itemInput}
              placeholder='未設定'
              autoCapitalize='none'
              value={height}
              onChangeText={(value) => { setHeight(value) }}
              keyboardType='decimal-pad'
            >
            </TextInput>
          </View>

          <View style={styles.items}>
            <Text style={styles.itemText}>体重</Text>
            <TextInput
              style={styles.itemInput}
              placeholder='未設定'
              autoCapitalize='none'
              value={weight}
              onChangeText={(value) => { setWeight(value) }}
              keyboardType='decimal-pad'
            >
            </TextInput>
          </View>

          <View style={styles.items}>
            <Text style={styles.itemText}>生年月日</Text>
            <TextInput
              style={styles.itemInput}
              editable={false}
              placeholder='未設定'
              autoCapitalize='none'
              value={formDate(birthday)}
              onPressIn={() => { setDatePickerVisible(true) }}
            >
            </TextInput>
            <DateTimePickerModal
              date={!Number.isNaN(birthday.valueOf()) ? birthday : new Date(2000, 0, 1)}
              isVisible={datePickerVisible}
              mode='date'
              onConfirm={(date) => {
                setBirthday(date)
                setDatePickerVisible(false)
              }}
              onCancel={() => { setDatePickerVisible(false) }}
            />
          </View>

          <View style={styles.items}>
            <Text style={styles.itemText}>性別</Text>
            <View style={styles.itemInput}>
              <Dropdown
                data={GenderMenu()}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder={'性別を選択'}
                placeholderStyle={{ color: '#B8B8B8' }}
                value={gender}
                onChange={({ value }) => {
                  setGender(value)
                }}
              />
            </View>
          </View>

          <View style={styles.items}>
            <Text style={styles.itemText}>活動レベル</Text>
            <View style={styles.itemInput}>
              <Dropdown
                data={ActiveMenu()}
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder={'活動レベルを選択'}
                placeholderStyle={{ color: '#B8B8B8' }}
                value={activeLevel}
                onChange={({ value }) => {
                  setActiveLevel(value)
                }}
              />
            </View>
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
    margin: 30,
    marginBottom: 150
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
  buttons: {
    marginVertical: 20,
    alignItems: 'center'
  }
})

export default EditProf
