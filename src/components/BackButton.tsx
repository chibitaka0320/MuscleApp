import { router } from 'expo-router'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export const BackButton = (): JSX.Element => {
  return (
    <TouchableOpacity onPress={() => { router.back() }}>
      <Text style={styles.text}>戻る</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
