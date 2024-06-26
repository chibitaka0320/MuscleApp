// react
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'

// navigator
import { router, useNavigation } from 'expo-router'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// components
import { CircleButton } from '../../components/CircleButton'
import { getNow } from '../../components/GetNowDate'

// screen
import Training from './training'
import Eating from './eating'
import Body from './body'

// other
import { Entypo, Feather } from '@expo/vector-icons'
import { WeekCalendar, CalendarProvider } from 'react-native-calendars'

const Tab = createMaterialTopTabNavigator()
const today = getNow()
const circleButtonPress = (date: string): void => {
  router.push({ pathname: 'create/createMenu', params: { date } })
}

const Layout = (): JSX.Element => {
  const navigation = useNavigation()
  const [selectDate, setSelectDate] = useState<string>(today)
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
      <CalendarProvider
        date={today}
        showTodayButton
        onDateChanged={(date) => {
          setSelectDate(date.toString())
        } }
        todayBottomMargin={75}
      >
        <WeekCalendar/>
        <Tab.Navigator>
          <Tab.Screen
            name='Training'
            options={{ tabBarLabel: 'トレーニング' }}
          >
            {() => <Training date={selectDate}/>}
          </Tab.Screen>
          <Tab.Screen
            name='Eating'
            options={{ tabBarLabel: '食事' }}
          >
            {() => <Eating date={selectDate}/> }
          </Tab.Screen>
          <Tab.Screen
            name='Body'
            options={{ tabBarLabel: 'ボディー' }}
          >
            {() => <Body date={selectDate}/> }
          </Tab.Screen>
        </Tab.Navigator>
      </CalendarProvider>
      <CircleButton onPress={ () => { circleButtonPress(selectDate) } } style={{ position: 'absolute', right: 40, bottom: 60 }}>
        <Entypo name='plus'size={40} />
      </CircleButton>
    </>
  )
}

export default Layout
