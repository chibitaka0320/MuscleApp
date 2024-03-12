import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

const CreateBody = (): JSX.Element => {
  const { date } = useLocalSearchParams()
  return (
    <View>
      <Text>{date}</Text>
    </View>
  )
}

export default CreateBody
