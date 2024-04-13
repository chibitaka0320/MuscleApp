// react
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native'

// navigator
import { router, useLocalSearchParams, useNavigation } from 'expo-router'

// firebase
import { auth, db } from '../../config'
import { Timestamp, deleteDoc, doc, setDoc } from 'firebase/firestore'

const onUpdate = async (id: string, date: string, parts: string, events: string, weight: string, set: string, createDate: Timestamp): Promise<void> => {
  if (auth.currentUser === null) { return }
  if ((weight !== '' && set !== '')) {
    const editDoc = doc(db, `users/${auth.currentUser.uid}/training`, id)
    try {
      await setDoc(editDoc, {
        date,
        parts,
        events,
        weight,
        set,
        createDate
      })
      router.back()
      router.replace('home/training')
    } catch {
      Alert.alert('情報に誤りがあります')
    }
  } else {
    Alert.alert('未入力事項があります')
  }
}

const onDelete = (id: string): void => {
  if (auth.currentUser === null) { return }
  const delDoc = doc(db, `users/${auth.currentUser.uid}/training`, id)
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
        router.replace('home/training')
      }
    }
  ])
}

const EditTraining = (): JSX.Element | null => {
  const navigation = useNavigation()

  const id = String(useLocalSearchParams().id)
  const date = String(useLocalSearchParams().date)
  const parts = String(useLocalSearchParams().parts)
  const events = String(useLocalSearchParams().events)
  const weight = String(useLocalSearchParams().weight)
  const set = String(useLocalSearchParams().set)
  const createDate = Timestamp.fromDate(new Date(String(useLocalSearchParams().createDate)))

  const [weightValue, setWeightValue] = useState<string>(weight)
  const [setValue, setSetValue] = useState<string>(set)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${date}`
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.contents}>

        <View style={styles.items}>
          <Text style={styles.itemText}>部位</Text>
          <View style={styles.itemInput}>
            <Text style={styles.itemInputValue}>{parts}</Text>
          </View>
        </View>

        <View style={styles.items}>
          <Text style={styles.itemText}>種目</Text>
          <View style={styles.itemInput}>
            <Text style={styles.itemInputValue}>{events}</Text>
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

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.update}
            onPress={() => { void onUpdate(id, date, parts, events, weightValue, setValue, createDate) }}
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
    height: 40,
    justifyContent: 'center'
  },
  itemInputValue: {
    fontSize: 16
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

export default EditTraining
