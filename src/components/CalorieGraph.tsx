import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

const data = { data: [0.4, 0.6, 0.8, 0.6] }
const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  color: (opacity = 1) => `rgba(99, 176, 242, ${opacity})`

}
const screenWidth = Dimensions.get('window').width / 2.2

const CalorieGraph = (): JSX.Element => {
  return (
    <View style={styles.calorieGraph}>
      <View>
        <ProgressChart
          data={data}
          width={screenWidth}
          height={screenWidth}
          chartConfig={chartConfig}
          strokeWidth={8}
          radius={40}
          hideLegend={true}
        />
      </View>
      <View style={styles.calorie}>
        <Text>摂取カロリー</Text>
        <Text>Total  1800 kcal</Text>
        <Text>P  120/135 g</Text>
        <Text>F  40/40 g</Text>
        <Text>C  200/270 kcal</Text>
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
    width: '40%'
  }
})

export default CalorieGraph
