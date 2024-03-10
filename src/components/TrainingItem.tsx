import { View, Text, StyleSheet } from 'react-native'

export const TrainingItem = (): JSX.Element => {
  return (
    <View>
      <View style={styles.itemEvent}>
        <Text>ベンチプレス</Text>
      </View>

      <View>
        <View style={styles.itemCount}>
          <View style={styles.itemCountNum}>
            <Text style={styles.itemCountNumValue}>1</Text>
          </View>
          <View style={styles.itemCountWeight}>
            <Text style={styles.itemCountWeightValue}>100kg</Text>
          </View>
          <View style={styles.itemCountSet}>
            <Text style={styles.itemCountSetValue}>2回</Text>
          </View>
        </View>

        <View style={styles.itemCount}>
          <View style={styles.itemCountNum}>
            <Text style={styles.itemCountNumValue}>2</Text>
          </View>
          <View style={styles.itemCountWeight}>
            <Text style={styles.itemCountWeightValue}>80kg</Text>
          </View>
          <View style={styles.itemCountSet}>
            <Text style={styles.itemCountSetValue}>7回</Text>
          </View>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemEvent: {
    marginHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    borderBottomWidth: 2,
    borderColor: '#DEDDDC'
  },
  itemCount: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15
  },
  itemCountNum: {
    width: '20%'
  },
  itemCountNumValue: {
    fontWeight: 'bold',
    fontSize: 18
  },
  itemCountWeight: {
    width: '35%'
  },
  itemCountWeightValue: {
    fontSize: 18
  },
  itemCountSet: {
    width: '30%'
  },
  itemCountSetValue: {
    fontSize: 18
  }
})
