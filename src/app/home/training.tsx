import { View, Text, StyleSheet } from 'react-native'
import { TrainingItem } from '../../components/TrainingItem'

const Training = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.item}>

          <View style={styles.itemPart}>
            <Text style={styles.itemPartTitle}>胸</Text>
          </View>

          <TrainingItem/>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: '#FFFFFF'
  },
  item: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginVertical: 30,
    // borderWidth: 0.5,
    borderRadius: 5,
    overflow: 'hidden'
  },
  itemPart: {
    backgroundColor: '#94E1F2',
    padding: 10
  },
  itemPartTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default Training
