import { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { eventMenu } from '../../data/TrainingMenu'
import { AntDesign } from '@expo/vector-icons'

// firebase
import { auth, db } from '../../config'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'

interface Props {
  label: string
  id?: string
}

const onDelete = (id: string | undefined): void => {
  if (id === undefined) return
  Alert.alert('リストを削除します', 'よろしいですか', [
    {
      text: 'キャンセル'
    },
    {
      text: '削除する',
      style: 'destructive',
      onPress: (): void => {
        if (auth.currentUser === null) { return }
        const delDoc = doc(db, `users/${auth.currentUser.uid}/data`, id)
        const fetch = async (): Promise<void> => {
          await deleteDoc(delDoc)
        }
        void fetch()
      }
    }
  ])
}

const Other = (): JSX.Element => {
  const [myData, setMyData] = useState<Props[]>([])
  const [initData, setInitData] = useState<Props[]>([])
  useEffect(() => {
    setInitData(eventMenu('その他'))
    if (auth.currentUser === null) return
    const ref = collection(db, `users/${auth.currentUser.uid}/data`)
    const q = query(ref, where('parts', '==', 'その他'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const getDatas: Props[] = []
      snapshot.forEach((doc) => {
        const snapDoc = {
          label: doc.data().event,
          id: doc.id
        }
        getDatas.push(snapDoc)
      })
      setMyData(getDatas)
    })
    return unsubscribe
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={initData}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemValue} numberOfLines={1}>{item.label}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <FlatList
            data={myData}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemValue} numberOfLines={1}>{item.label}</Text>
                <TouchableOpacity onPress={() => { onDelete(item.id) }}>
                  <AntDesign name='delete' size={20}/>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
        ListFooterComponent={() => <View style={{ height: 150 }}></View>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  list: {
    padding: 20,
    marginBottom: 20
  },
  item: {
    paddingRight: 25,
    paddingLeft: 15,
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#DEDDDC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemValue: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '88%'
  }
})

export default Other
