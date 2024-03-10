import { View, Text, StyleSheet } from 'react-native'
import { CircleButton } from '../../components/CircleButton'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const onBody = (): void => {
  router.replace('/create/createBody')
}

const createMenu = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <View>
          <Text style={styles.menuTitle}>ボディ</Text>
          <CircleButton style={styles.circleButton} onPress={onBody}>
            <FontAwesome5 name='camera' size={30}/>
          </CircleButton>
        </View>
        <View>
          <Text style={styles.menuTitle}>トレーニング</Text>
          <CircleButton style={styles.circleButton}>
            <FontAwesome5 name='dumbbell' size={30}/>
          </CircleButton>
        </View>
        <View>
          <Text style={styles.menuTitle}>食事</Text>
          <CircleButton style={styles.circleButton}>
            <MaterialIcons name='set-meal' size={30}/>
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
