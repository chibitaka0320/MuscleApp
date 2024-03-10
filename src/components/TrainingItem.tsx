import { View, Text, StyleSheet } from 'react-native'

const FONTSIZE = 15

export const TrainingItem = (): JSX.Element => {
  return (
    <View>
      <View style={styles.itemEvent}>
        <Text>ベンチプレス</Text>
      </View>

      <View>
        <View style={styles.itemCount}>
          <Text style={styles.itemCountNum}>1</Text>
          <Text style={styles.itemCountWeight}>100 kg</Text>
          <Text style={styles.itemCountSet}>7 回</Text>
        </View>

        <View style={styles.itemCount}>
          <Text style={styles.itemCountNum}>2</Text>
          <Text style={styles.itemCountWeight}>80 kg</Text>
          <Text style={styles.itemCountSet}>7 回</Text>
        </View>

      </View>
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
