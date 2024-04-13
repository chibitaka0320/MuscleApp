import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { type Sets, type Events } from '../app/types/Training'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

const FONTSIZE = 15

interface Props {
  data: Events
  parts: string
  date: string
}

const onEventsPlus = (parts: string, events: string, date: string): void => {
  router.push({
    pathname: '/create/createTraining',
    params: { parts, events, date }
  })
}

const onEdit = (parts: string, events: string, sets: Sets, date: string): void => {
  router.push({
    pathname: '/edit/editTraining',
    params: {
      parts,
      events,
      date,
      weight: sets.weight,
      set: sets.set,
      createDate: sets.createDate.toDate(),
      id: sets.id
    }
  })
}

export const EventsItem = (props: Props): JSX.Element => {
  const { data, parts, date } = props
  return (
    <View>
      <View style={styles.itemEvent}>
        <Text>{data.eventName}</Text>
        <TouchableOpacity
          style={styles.eventPlus}
          onPress={() => { onEventsPlus(parts, data.eventName, date) }}>
          <Feather name='plus-circle' size={20}/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data.sets}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.itemCount}
            onPress={() => { onEdit(parts, data.eventName, item, date) }}>
            <Text style={styles.itemCountNum}>{index + 1}</Text>
            <Text style={styles.itemCountWeight}>{item.weight} kg</Text>
            <Text style={styles.itemCountSet}>{item.set} 回</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  itemEvent: {
    marginHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 10,
    fontSize: 16,
    borderBottomWidth: 2,
    borderColor: '#DEDDDC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  eventPlus: {
    marginRight: 15
  },
  itemCount: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    padding: 8
  },
  itemCountNum: {
    width: '20%',
    fontWeight: 'bold',
    fontSize: FONTSIZE
  },
  itemCountWeight: {
    width: '35%',
    fontSize: FONTSIZE
  },
  itemCountSet: {
    width: '30%',
    fontSize: FONTSIZE
  }
})
