import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

// components
import CalorieGraph from '../../components/CalorieGraph'

const FONTSIZE = 13

const Eating = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <CalorieGraph/>
      </View>
      <View style={styles.item}>
        <View style={[styles.eatContent, styles.header]}>
          <Text style={[styles.content, styles.headerContent]}>食事</Text>
          <Text style={[styles.total, styles.headerValue]}>カロリー</Text>
          <Text style={[styles.protein, styles.headerValue]}>P</Text>
          <Text style={[styles.fat, styles.headerValue]}>F</Text>
          <Text style={[styles.carbo, styles.headerValue]}>C</Text>
        </View>
        <TouchableOpacity style={styles.eatContent}>
          <Text style={styles.content}>Hello</Text>
          <Text style={styles.total}>1800 kcal</Text>
          <Text style={styles.protein}>40 g</Text>
          <Text style={styles.fat}>270 g</Text>
          <Text style={styles.carbo}>100 g</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eatContent}>
          <Text style={styles.content}>Hello</Text>
          <Text style={styles.total}>1800 kcal</Text>
          <Text style={styles.protein}>40 g</Text>
          <Text style={styles.fat}>270 g</Text>
          <Text style={styles.carbo}>100 g</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginVertical: 30,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 15
  },
  eatContent: {
    flexDirection: 'row',
    marginVertical: 5
  },
  header: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#DEDDDC'
  },
  headerContent: {
    fontWeight: 'bold'
  },
  headerValue: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  content: {
    width: '35%',
    fontSize: FONTSIZE
  },
  total: {
    width: '23%',
    fontSize: FONTSIZE
  },
  protein: {
    width: '14%',
    fontSize: FONTSIZE
  },
  fat: {
    width: '14%',
    fontSize: FONTSIZE
  },
  carbo: {
    width: '14%',
    fontSize: FONTSIZE
  }
})

export default Eating
