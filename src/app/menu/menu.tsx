import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, SimpleLineIcons, Feather } from '@expo/vector-icons'
import { router } from 'expo-router'

const COLOR = '#8C8C88'
const FONTSIZE = 16

const onHome = (): void => {
  router.back()
}

const onGoal = (): void => {
  router.push('/setting/goalSetting')
}

const onProf = (): void => {
  router.push('/setting/profSetting')
}

const onAccount = (): void => {
  router.push('/setting/accountSetting')
}

const Menu = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => { onHome() }}>
        <View style={styles.itemLeft}>
          <Feather name='home' size={20} style={styles.itemIcon}/>
          <Text style={styles.itemName}>ホーム</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => { onProf() }}>
        <View style={styles.itemLeft}>
          <Feather name='user' size={20} style={styles.itemIcon}/>
          <Text style={styles.itemName}>プロフィール設定</Text>
        </View>
        <MaterialIcons name='arrow-forward-ios' size={20} color={COLOR}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => { onGoal() }}>
        <View style={styles.itemLeft}>
          <Feather name='flag' size={20} style={styles.itemIcon}/>
          <Text style={styles.itemName}>目標設定</Text>
        </View>
        <MaterialIcons name='arrow-forward-ios' size={20} color={COLOR}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <SimpleLineIcons name='share' size={20} style={styles.itemIcon}/>
          <Text style={styles.itemName}>共有設定</Text>
        </View>
        <MaterialIcons name='arrow-forward-ios' size={20} color={COLOR}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => { onAccount() }} >
        <View style={styles.itemLeft}>
          <SimpleLineIcons name='settings' size={20} style={styles.itemIcon}/>
          <Text style={styles.itemName}>アカウント設定</Text>
        </View>
        <MaterialIcons name='arrow-forward-ios' size={20} color={COLOR}/>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 25,
    backgroundColor: '#FFFFFF'
  },
  item: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemIcon: {
    width: 40
  },
  itemName: {
    fontSize: FONTSIZE
  }
})

export default Menu
