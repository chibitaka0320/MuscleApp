import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'

// component
import { CircleButton } from '../../components/CircleButton'

// const onBody = (date: string): void => {
//   router.replace({ pathname: '/create/createBody', params: { date } })
// }
const onTraining = (date: string): void => {
  router.replace({ pathname: '/create/createTraining', params: { date } })
}
const onEating = (date: string): void => {
  router.replace({ pathname: '/create/createEat', params: { date } })
}
const onEventList = (): void => {
  router.replace({ pathname: 'eventList' })
}

const createMenu = (): JSX.Element => {
  const { date } = useLocalSearchParams()

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        {/* <View>
          <Text style={styles.menuTitle}>ボディ</Text>
          <CircleButton
            style={styles.circleButton}
            onPress={() => {
              if (typeof date === 'string') {
                onBody(date)
              }
            }}>
            <FontAwesome5 name='camera' size={30}/>
          </CircleButton>
        </View> */}
        <View>
          <Text style={styles.menuTitle}>トレーニング</Text>
          <CircleButton
            style={styles.circleButton}
            onPress={() => {
              if (typeof date === 'string') {
                onTraining(date)
              }
            }}
          >
            <FontAwesome5 name='dumbbell' size={30}/>
          </CircleButton>
        </View>
        <View>
          <Text style={styles.menuTitle}>食事</Text>
          <CircleButton
            style={styles.circleButton}
            onPress={() => {
              if (typeof date === 'string') {
                onEating(date)
              }
            }}
          >
            <MaterialIcons name='set-meal' size={30}/>
          </CircleButton>
        </View>
        <View>
          <Text style={styles.menuTitle}>種目リスト</Text>
          <CircleButton
            style={styles.circleButton}
            onPress={() => { onEventList() }}
          >
            <MaterialIcons name='list-alt' size={30}/>
          </CircleButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  menuTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10
  },
  circleButton: {
    width: 80,
    height: 80
  }
})

export default createMenu
