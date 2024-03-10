import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'

// components
import { LogoutButton } from '../../components/LogoutButton'

const COLOR = '#8C8C88'
const FONTSIZE = 16

const Menu = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <SimpleLineIcons name='settings' size={20} style={styles.itemIcon}/>
          <Text style={styles.itemName}>Setting</Text>
        </View>
        <MaterialIcons name='arrow-forward-ios' size={20} color={COLOR}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <SimpleLineIcons name='settings' size={20} style={styles.itemIcon}/>
          <Text style={styles.itemName}>Setting</Text>
        </View>
        <MaterialIcons name='arrow-forward-ios' size={20} color={COLOR}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <SimpleLineIcons name='settings' size={20} style={styles.itemIcon}/>
          <Text style={styles.itemName}>Setting</Text>
        </View>
        <MaterialIcons name='arrow-forward-ios' size={20} color={COLOR}/>
      </TouchableOpacity>
      <LogoutButton/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF'
  },
  item: {
    padding: 10,
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
