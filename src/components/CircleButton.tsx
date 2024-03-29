import { TouchableOpacity, Text, StyleSheet, type TextStyle } from 'react-native'

interface Props {
  children: JSX.Element
  onPress?: () => void
  style?: TextStyle
}

export const CircleButton = (props: Props): JSX.Element => {
  const { children, onPress, style } = props
  return (
    <TouchableOpacity style={[styles.circleButton, style]} onPress={onPress}>
      <Text style={styles.circleButtonLabel}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  circleButton: {
    height: 60,
    width: 60,
    backgroundColor: '#467FD8',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleButtonLabel: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 40
  }
})
