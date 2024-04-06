// react
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'

// navigator
import { router, useNavigation } from 'expo-router'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// screen
import Chest from './chest'
import Back from './back'

// components
import { CircleButton } from '../../components/CircleButton'

// other
import { Feather, Entypo } from '@expo/vector-icons'
import Shoulder from './shoulder'
import Arm from './arm'
import Leg from './leg'
import Abs from './abs'
import Other from './other'

const Tab = createMaterialTopTabNavigator()

const circleButtonPress = (): void => {
  router.push({ pathname: 'create/createEvent' })
}

const Layout = (): JSX.Element => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => { router.push('menu/menu') }}>
            <Feather name='menu' size={25}/>
          </TouchableOpacity>
        )
      }
    })
  }, [])

  return (
    <>
    <Tab.Navigator>
      <Tab.Screen
        name='chest'
        options={{ tabBarLabel: '胸' }}
      >
      {() => <Chest/>}
      </Tab.Screen>
      <Tab.Screen
        name='back'
        options={{ tabBarLabel: '背中' }}
      >
      {() => <Back/> }
      </Tab.Screen>
      <Tab.Screen
        name='shoulder'
        options={{ tabBarLabel: '肩' }}
      >
      {() => <Shoulder/> }
      </Tab.Screen>
      <Tab.Screen
        name='arm'
        options={{ tabBarLabel: '腕' }}
      >
      {() => <Arm/> }
      </Tab.Screen>
      <Tab.Screen
        name='abs'
        options={{ tabBarLabel: '腹筋' }}
      >
      {() => <Abs/> }
      </Tab.Screen>
      <Tab.Screen
        name='leg'
        options={{ tabBarLabel: '足' }}
      >
      {() => <Leg/> }
      </Tab.Screen>
      <Tab.Screen
        name='other'
        options={{ tabBarLabel: 'その他' }}
      >
      {() => <Other/> }
      </Tab.Screen>
    </Tab.Navigator>
    <CircleButton onPress={ () => { circleButtonPress() } } style={{ position: 'absolute', right: 40, bottom: 60 }}>
      <Entypo name='plus'size={40} />
    </CircleButton>
    </>
  )
}

export default Layout
