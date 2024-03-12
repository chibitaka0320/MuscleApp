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
  const [selectDate, setSelectDate] = useState(today)
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
        onDateChanged={(date: string) => {
          setSelectDate(date)
        } }
        todayBottomMargin={100}
      >
        <WeekCalendar/>
        <Tab.Navigator>
          <Tab.Screen
            name='Training'
            options={{ tabBarLabel: 'トレーニング' }}
          >
            {(props) => <Training date={selectDate}/>}
          </Tab.Screen>
          <Tab.Screen
            name='Eating'
            component={Eating}
            options={{ tabBarLabel: '食事' }}
          />
        </Tab.Navigator>
      </CalendarProvider>
      <CircleButton onPress={ () => { circleButtonPress(selectDate) } } style={{ position: 'absolute', right: 40, bottom: 110 }}>
        <Entypo name='plus'size={40} />
      </CircleButton>
    </>
  )
}

export default Layout
