import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types'

type Props = NativeStackScreenProps<RootStackParamList>

const ChatScreen = ({ navigation }: Props) => {

  return (
    <ScrollView contentContainerStyle={style.content}>
      <Text>Chat</Text>
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

export default ChatScreen