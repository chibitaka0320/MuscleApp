import { View, Text, StyleSheet } from 'react-native'

const Eating = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.item}>
          <Text>graph</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: '#FFFFFF'
  },
  item: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginVertical: 30,
    borderRadius: 5,
    overflow: 'hidden',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Eating
