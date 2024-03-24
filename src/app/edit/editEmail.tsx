import { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

// components
import { LandscapeButton } from '../../components/LandscapeButton'

const handlePress = (email: string): void => {
  router.back()
}

const editEmail = (): JSX.Element => {
  const [email, setEmail] = useState(String(useLocalSearchParams().email))
  return (
    <View style={styles.container}>
      <Text>メールアドレス</Text>
      <TextInput
        style={styles.textInput}
        autoFocus
        value={email}
        onChangeText={(value) => { setEmail(value) }}
      >
      </TextInput>
      <View style={styles.button}>
        <LandscapeButton onPress={() => { handlePress(email) }} >変更</LandscapeButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEDDDC',
    borderRadius: 3,
    fontSize: 16,
    paddingHorizontal: 10,
    height: 40,
    marginVertical: 10
  },
  button: {
    alignItems: 'center',
    marginTop: 240
  }
})

export default editEmail
