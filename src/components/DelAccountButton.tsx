import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { router } from 'expo-router'

// firebase
// import { signOut } from 'firebase/auth'
// import { auth } from '../config'

// const onLogout = (): void => {
//   Alert.alert('ログアウトしますか？', '', [
//     {
//       text: 'キャンセル'
//     },
//     {
//       text: 'ログアウト',
//       style: 'destructive',
//       onPress: () => {
//         signOut(auth)
//           .then(() => {
//             router.back()
//             router.replace('/auth/login')
//           })
//           .catch(() => {
//             Alert.alert('ログアウトに失敗しました')
//           })
//       }
//     }
//   ])
// }

export const DeleteAccountButton = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}} >
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
