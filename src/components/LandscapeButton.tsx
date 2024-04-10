import { Text, StyleSheet, TouchableOpacity, type TextStyle } from 'react-native'

interface Props {
  children: string
  onPress?: () => void
  style?: TextStyle
  visible?: boolean
}

export const LandscapeButton = (props: Props): JSX.Element => {
  const { children, onPress, style, visible } = props
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={visible ?? false}>
      <Text>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEDDDC',
    marginVertical: 15,
    borderRadius: 20,
    height: 50,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
