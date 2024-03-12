import { View, Text, StyleSheet, FlatList } from 'react-native'
import { type Events } from '../app/types/Training'

const FONTSIZE = 15

interface Props {
  data: Events
}

export const EventsItem = (props: Props): JSX.Element => {
  const { data } = props
  return (
    <View>
      <View style={styles.itemEvent}>
        <Text>{data.eventName}</Text>
      </View>
      <FlatList
        data={data.sets}
        renderItem={({ item, index }) => (
          <View style={styles.itemCount}>
            <Text style={styles.itemCountNum}>{index + 1}</Text>
            <Text style={styles.itemCountWeight}>{item.weight} kg</Text>
            <Text style={styles.itemCountSet}>{item.set} 回</Text>
          </View>
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
    borderColor: '#DEDDDC'
  },
  itemCount: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10
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
