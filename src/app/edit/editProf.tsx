// react
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Dropdown } from 'react-native-element-dropdown'

// navigator
import { router, useLocalSearchParams } from 'expo-router'

// firebase
import { auth, db } from '../../config'
import { doc, setDoc } from 'firebase/firestore'

// components
import { LandscapeButton } from '../../components/LandscapeButton'

// data
import { ActiveMenu, GenderMenu } from '../../data/UserMenu'

const handlePress = async (userName: string, height: string, weight: string, birthday: Date, gender: string, activeLevel: string): Promise<void> => {
  if (auth.currentUser === null) { return }
  console.log(userName, height, weight, birthday, gender, activeLevel)
  const userDoc = doc(db, `users/${auth.currentUser.uid}`)
  try {
    await setDoc(userDoc, {
      userName,
      height,
      weight,
      birthday: !Number.isNaN(birthday.valueOf()) ? birthday : null,
      gender,
      activeLevel
    })
    router.back()
  } catch {
    Alert.alert('情報に誤りがあります')
  }
}

const formBirthday = (date: Date): string => {
  if (!Number.isNaN(date.valueOf())) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}年${month}月${day}日`
  }
  return ''
}

const EditProf = (): JSX.Element | null => {
  const getUserName = String(useLocalSearchParams().userName ?? '')
  const getHeight = String(useLocalSearchParams().height ?? '')
  const getWeight = String(useLocalSearchParams().weight ?? '')
  const getBirthday = new Date(String(useLocalSearchParams().birthday ?? ''))
  const getGender = String(useLocalSearchParams().gender ?? '')
  const getActiveLevel = String(useLocalSearchParams().activeLevel ?? '')

  const [userName, setUserName] = useState<string>(getUserName)
  const [height, setHeight] = useState<string>(getHeight)
  const [weight, setWeight] = useState<string>(getWeight)
  const [birthday, setBirthday] = useState<Date>(getBirthday)
  const [gender, setGender] = useState<string>(getGender)
  const [activeLevel, setActiveLevel] = useState<string>(getActiveLevel)
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)

  return (
    <View style={styles.container}>
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
            value={formBirthday(birthday)}
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
            onPress={() => { void handlePress(userName, height, weight, birthday, gender, activeLevel) }}>
            保存
          </LandscapeButton>
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
