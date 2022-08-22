import { ScrollView, Text, StyleSheet } from 'react-native'
import { RootTabScreenProps } from '../types'

const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {

  return (
    <ScrollView contentContainerStyle={style.content}>
      <Text>Home</Text>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomeScreen