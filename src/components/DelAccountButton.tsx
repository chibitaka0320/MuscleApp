import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

const onLogout = (): void => {
  router.push('/auth/deleteAccount')
}

export const DeleteAccountButton = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { onLogout() }} >
        <Text style={styles.outText}>アカウント削除</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: '#DEDDDC'
  },
  outText: {
    color: 'red',
    fontSize: 16,
    marginVertical: 10,
    paddingVertical: 10
  }
})
