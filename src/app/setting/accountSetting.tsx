import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

// components
import { LogoutButton } from '../../components/LogoutButton'
import { DeleteAccountButton } from '../../components/DelAccountButton'

// firebase
import { auth } from '../../config'

const COLOR = '#8C8C88'
const FONTSIZE = 16

const onEmail = (email: string): void => {
  router.push({ pathname: '/edit/editEmail', params: { email } })
}

const onPassword = (): void => {
  router.push('/edit/editPassword')
}

const AccountSetting = (): JSX.Element => {
  const [uid, setUid] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  useEffect(() => {
    if (auth.currentUser === null) return
    if (auth.currentUser.email === null) return
    setUid(auth.currentUser.uid)
    setEmail(auth.currentUser.email)
  }, [auth.currentUser])

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <View style={styles.item}>
          <Text style={styles.itemName}>アカウントID</Text>
          <Text style={styles.itemValue}>{uid}</Text>
        </View>

        <TouchableOpacity style={styles.item} onPress={() => { onEmail(email) }}>
          <Text style={styles.itemName}>メールアドレス</Text>
          <View style={styles.itemRight}>
            <Text style={styles.itemValueRight}>{email}</Text>
            <MaterialIcons name='arrow-forward-ios' size={20} color={COLOR}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => { onPassword() }}>
          <Text style={styles.itemName}>パスワード</Text>
          <View style={styles.itemRight}>
            <Text style={styles.itemValueRight}>変更</Text>
            <MaterialIcons name='arrow-forward-ios' size={20} color={COLOR}/>
          </View>
        </TouchableOpacity>

      </View>
      <LogoutButton/>
      <DeleteAccountButton/>
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
  contents: {
    marginBottom: 15
  },
  item: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemName: {
    fontSize: FONTSIZE
  },
  itemValue: {

  },
  itemValueRight: {
    paddingRight: 8
  }
})

export default AccountSetting
