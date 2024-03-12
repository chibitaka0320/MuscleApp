import { useState } from 'react'
// import { useLocalSearchParams } from 'expo-router'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

// compnents
import { OblongButton } from '../../components/OblongButton'

// data
import { eventMenu, partsMenu } from '../../data/TrainingMenu'

const handlePress = (parts: string, events: string, weight: string, set: string): void => {
  console.log(parts, events, weight, set)
}

const CreateTraining = (): JSX.Element => {
//   const { date } = useLocalSearchParams()
//   const date = '2024-03-12'
  const [partsValue, setPartsValue] = useState('')
  const [eventsValue, setEventsValue] = useState('')
  const [weightValue, setWeightValue] = useState('')
  const [setValue, setSetValue] = useState('')
  return (
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
              data={eventMenu(partsValue)}
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
          <Text style={styles.itemText}>重量</Text>
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
          onPress={() => { handlePress(partsValue, eventsValue, weightValue, setValue) }}>
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
  }
})

export default CreateTraining
