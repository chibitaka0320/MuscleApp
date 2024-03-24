import { View, Text, StyleSheet, FlatList } from 'react-native'
import { EventsItem } from './EventsItem'
import { type Parts } from '../app/types/Training'

interface Props {
  data: Parts
  date: string
}

export const PartsItem = (props: Props): JSX.Element => {
  const { data, date } = props
  return (
    <View style={styles.item}>
      <View style={styles.itemPart}>
        <Text style={styles.itemPartTitle}>{data.parts}</Text>
      </View>
      <FlatList
        data={data.events}
        renderItem={({ item }) => <EventsItem data={item} parts={data.parts} date={date}/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 30,
    paddingBottom: 10,
    // borderWidth: 0.5,
    borderRadius: 5,
    overflow: 'hidden'
  },
  itemPart: {
    backgroundColor: '#9dcffa',
    padding: 10
  },
  itemPartTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
