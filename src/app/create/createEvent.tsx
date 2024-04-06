// react
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'

// navigator
import { router } from 'expo-router'

// compnents
import { OblongButton } from '../../components/OblongButton'

// firebase
import { auth, db } from '../../config'
import { addDoc, collection } from 'firebase/firestore'

// data
import { partsMenu } from '../../data/TrainingMenu'

// other
import { Dropdown } from 'react-native-element-dropdown'

const handlePress = async (parts: string, event: string): Promise<void> => {
  if (auth.currentUser === null) { return }
  if ((parts === '' || event === '')) {
    Alert.alert('未入力事項があります')
  } else if (event.length > 30) {
    Alert.alert('種目名を30字以内で入力してください')
  } else {
    const ref = collection(db, `users/${auth.currentUser.uid}/data`)
    try {
      await addDoc(ref, {
        parts,
        event
      })
      router.back()
    } catch {
      Alert.alert('情報に誤りがあります')
    }
  }
}

const CreateEvent = (): JSX.Element | null => {
  const [partsValue, setPartsValue] = useState<string>('')
  const [eventsValue, setEventsValue] = useState<string>('')

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
            <Text style={styles.itemText}>種目名</Text>
            <TextInput
              style={styles.itemInput}
              placeholder='種目名'
              autoCapitalize='none'
              value={eventsValue}
              onChangeText={(value) => { setEventsValue(value) }}
              >
            </TextInput>
          </View>

          <OblongButton
            style={{ marginVertical: 40 }}
            onPress={() => { void handlePress(partsValue, eventsValue) }}>
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

export default CreateEvent
