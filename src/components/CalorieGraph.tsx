import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

// types
import { type EatingGoalPFC, type EatingSumData } from '../app/types/Eating'

interface Props {
  data: EatingSumData
  goalKcal: number
  goalPFC: EatingGoalPFC
}

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  color: (opacity = 1) => `rgba(99, 176, 242, ${opacity})`

}
const screenWidth = Dimensions.get('window').width / 2.4

const calcPercent = (A: number, B: number): number => {
  const quotient = A / B
  if (quotient >= 1) {
    return 1
  } else {
    return quotient
  }
}

const CalorieGraph = (props: Props): JSX.Element => {
  const { goalKcal } = props
  const { total, protein, fat, carbo } = props.data
  const { goalProtein, goalFat, goalCarbo } = props.goalPFC
  // const { goalProtein, goalFat, goalCarbo } = sampleGoal
  const sampleData = [
    goalProtein !== 0 ? calcPercent(protein, goalProtein) : 0,
    goalFat !== 0 ? calcPercent(fat, goalFat) : 0,
    goalCarbo !== 0 ? calcPercent(carbo, goalCarbo) : 0]
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
            <View style={styles.topItemValue}>
              <Text style={styles.valueResult} numberOfLines={1}>{total}</Text>
              <Text style={styles.valueSlash}>/</Text>
              <Text style={styles.valueGoal} numberOfLines={1}>{goalKcal !== 0 ? goalKcal : '未設定'}</Text>
            </View>
            <Text style={styles.topItemUnit}>kcal</Text>
          </View>
        </View>
        <View style={styles.border}></View>
        <View style={styles.bottom}>
          <View style={styles.bottomItem}>
            <Text style={styles.bottomItemName}>P</Text>
            <View style={styles.bottomItemValue}>
              <Text style={styles.valueResult} numberOfLines={1}>{protein}</Text>
              <Text style={styles.valueSlash}>/</Text>
              <Text style={styles.valueGoal} numberOfLines={1}>{goalProtein !== 0 ? goalProtein : '未設定'}</Text>
            </View>
            <Text style={styles.bottomItemUnit}>g</Text>
          </View>
          <View style={styles.bottomItem}>
            <Text style={styles.bottomItemName}>F</Text>
            <View style={styles.bottomItemValue}>
              <Text style={styles.valueResult} numberOfLines={1}>{fat}</Text>
              <Text style={styles.valueSlash}>/</Text>
              <Text style={styles.valueGoal} numberOfLines={1}>{goalFat !== 0 ? goalFat : '未設定'}</Text>
            </View>
            <Text style={styles.bottomItemUnit}>g</Text>
          </View>
          <View style={styles.bottomItem}>
            <Text style={styles.bottomItemName}>C</Text>
            <View style={styles.bottomItemValue}>
              <Text style={styles.valueResult} numberOfLines={1}>{carbo}</Text>
              <Text style={styles.valueSlash}>/</Text>
              <Text style={styles.valueGoal} numberOfLines={1}>{goalCarbo !== 0 ? goalCarbo : '未設定'}</Text>
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
    width: '82%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
    width: '15%',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bottomItemValue: {
    width: '65%',
    flexDirection: 'row'
  },
  valueResult: {
    fontWeight: 'bold',
    width: '41%',
    textAlign: 'right'
  },
  valueSlash: {
    fontWeight: 'bold',
    width: '18%',
    textAlign: 'center'
  },
  valueGoal: {
    fontWeight: 'bold',
    width: '42%'
  },
  bottomItemUnit: {
    width: '23%',
    fontSize: 12,
    textAlign: 'center'
  }
})

export default CalorieGraph
