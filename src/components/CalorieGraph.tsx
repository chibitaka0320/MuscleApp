import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

// types
import { type EatingSumData } from '../app/types/Eating'

interface Props {
  data: EatingSumData
}

const sampleGoal = { goalProtein: 175, goalFat: 38, goalCarbo: 175 }
const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  color: (opacity = 1) => `rgba(99, 176, 242, ${opacity})`

}
const screenWidth = Dimensions.get('window').width / 2.4

const CalorieGraph = (props: Props): JSX.Element => {
  const { total, protein, fat, carbo } = props.data
  const { goalProtein, goalFat, goalCarbo } = sampleGoal
  const sampleData = [protein / goalProtein, fat / goalFat, carbo / goalCarbo]
  return (
    <View style={styles.calorieGraph}>
      <View>
        <ProgressChart
          data={sampleData}
          width={screenWidth}
          height={screenWidth}
          chartConfig={chartConfig}
          strokeWidth={6}
          radius={40}
          hideLegend={true}
        />
      </View>
      <View style={styles.calorie}>
        <View style={styles.top}>
          <Text style={styles.title}>総摂取カロリー/目標値</Text>
          <View style={styles.topItem}>
            <Text style={styles.topItemValue}>{total} / 1800</Text>
            <Text style={styles.topItemUnit}>kcal</Text>
          </View>
        </View>
        <View style={styles.border}></View>
        <View style={styles.bottom}>
          <View style={styles.bottomItem}>
            <Text style={styles.bottomItemName}>P</Text>
            <View style={styles.bottomItemValue}>
              <Text style={styles.valueResult}>{protein}</Text>
              <Text style={styles.valueSlash}>/</Text>
              <Text style={styles.valueGoal}>175</Text>
            </View>
            <Text style={styles.bottomItemUnit}>g</Text>
          </View>
          <View style={styles.bottomItem}>
            <Text style={styles.bottomItemName}>F</Text>
            <View style={styles.bottomItemValue}>
              <Text style={styles.valueResult}>{fat}</Text>
              <Text style={styles.valueSlash}>/</Text>
              <Text style={styles.valueGoal}>38</Text>
            </View>
            <Text style={styles.bottomItemUnit}>g</Text>
          </View>
          <View style={styles.bottomItem}>
            <Text style={styles.bottomItemName}>C</Text>
            <View style={styles.bottomItemValue}>
              <Text style={styles.valueResult}>{carbo}</Text>
              <Text style={styles.valueSlash}>/</Text>
              <Text style={styles.valueGoal}>175</Text>
            </View>
            <Text style={styles.bottomItemUnit}>g</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  calorieGraph: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  calorie: {
    width: '45%'
  },
  top: {
    marginVertical: 5
  },
  title: {
    marginBottom: 12,
    fontSize: 12
  },
  topItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topItemValue: {
    fontWeight: 'bold',
    fontSize: 17,
    width: '80%',
    textAlign: 'center'
  },
  topItemUnit: {
    fontSize: 12
  },
  border: {
    marginVertical: 8,
    borderWidth: 0.5
  },
  bottom: {
    marginVertical: 5
  },
  bottomItem: {
    flexDirection: 'row',
    marginTop: 3
  },
  bottomItemName: {
    width: '20%',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bottomItemValue: {
    width: '60%',
    flexDirection: 'row'
  },
  valueResult: {
    fontWeight: 'bold',
    width: '40%',
    textAlign: 'right'
  },
  valueSlash: {
    fontWeight: 'bold',
    width: '25%',
    textAlign: 'center'
  },
  valueGoal: {
    fontWeight: 'bold',
    width: '40%'
  },
  bottomItemUnit: {
    width: '20%',
    fontSize: 12,
    textAlign: 'center'
  }
})

export default CalorieGraph
