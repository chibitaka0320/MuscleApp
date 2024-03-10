import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Tabs, router, useNavigation } from 'expo-router'
import { FontAwesome5, Entypo, Feather, FontAwesome } from '@expo/vector-icons'
import { WeekCalendar, CalendarProvider } from 'react-native-calendars'

// components
import { CircleButton } from '../../components/CircleButton'

const handlePress = (): void => {
  router.push('create/createMenu')
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
  })

  return (
    <>
      <CalendarProvider
        date='2024-03-06'
        showTodayButton
        todayBottomMargin={120}
      >
        <WeekCalendar/>
        <Tabs
          screenOptions={{
            headerShown: false
          }}
        >
          <Tabs.Screen
            name="training"
            options={{
              title: '筋トレ',
              tabBarIcon: ({ color }) => <FontAwesome5 size={24} name="dumbbell" color={color} />
            }}
          />
          <Tabs.Screen
            name="eating"
            options={{
              title: '食事',
              tabBarIcon: ({ color }) => <FontAwesome size={24} name="cutlery" color={color} />
            }}
          />
        </Tabs>
      </CalendarProvider>
      <CircleButton onPress={handlePress} style={{ position: 'absolute', right: 40, bottom: 110 }}>
        <Entypo name='plus'size={40} />
      </CircleButton>
    </>
  )
}

export default Layout
