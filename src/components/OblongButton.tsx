import { Text, StyleSheet, TouchableOpacity, type TextStyle } from 'react-native'

interface Props {
  children: string
  onPress?: () => void
  style?: TextStyle
}

export const OblongButton = (props: Props): JSX.Element => {
  const { children, onPress, style } = props
  return (
    <TouchableOpacity style={[styles.Button, style]} onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEDDDC',
    marginVertical: 15,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
