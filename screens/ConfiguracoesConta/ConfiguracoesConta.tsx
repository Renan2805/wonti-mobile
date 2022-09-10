import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import { TickSquare } from 'react-native-iconly'

import { RootStackScreenProps } from '../../types'

const ConfiguracoesConta = ({navigation}: RootStackScreenProps<'App'>) => {
  
  const Header = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15}}>
        <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : {}}>
          <AntDesign name="arrowleft" size={35} color="black" />
        </TouchableOpacity>
        <Text style={{fontFamily: 'Poppins_700Bold', fontSize: 20, textAlign: 'center'}}>Informações</Text>
        <TickSquare set={'bold'} size={30} color={'black'}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
  }
})

export default ConfiguracoesConta