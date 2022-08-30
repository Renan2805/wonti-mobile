import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { RootStackParamList } from "../../types"

type Props = NativeStackScreenProps<RootStackParamList>

const FirstScreen = ({navigation, route}: Props) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          style={{width: 75, height: 23}}
          source={require('../../assets/images/logoWonti.png')}
        />
      </View>
      <View style={styles.content}>
        <Image 
          style={{width: 345, height: 345}}
          source={require('../../assets/images/tiwoman.png')}
        />
        <Text style={styles.title}>
          Encontre o emprego dos sonhos aqui
        </Text>
        <Text style={styles.text}>
          Candidate-se e dê o primeiro passo para a sua carreira profissional
        </Text>
        <View style={{
          width:'100%',
          alignItems: 'center'
        }}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {navigation.navigate('Intro')}}
          >
            <Text style={styles.buttonText}>
              Começar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {navigation.navigate('LoginScreen')}}
          >
            <Text style={{
              fontFamily: 'WorkSans_400Regular',
              fontSize: 20,
              textAlign: 'center',
              width: '100%',
              color: 'black',
              marginTop: 10
            }}>
              Pular
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    
  },
  header: {
    width: '100%',
    height: '10%',
    paddingHorizontal: 17,
    paddingTop: 50
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 26.5,
    maxWidth: '80%',
    textAlign: 'center'
  },
  text: {
    fontFamily: 'WorkSans_400Regular',
    fontSize: 15.8,
    maxWidth: '75%',
    textAlign: 'center',
    color: '#818181'
  },
  button: {
    width: '80%',
    backgroundColor: '#FF0356',
    borderRadius: 35,
    paddingVertical: 15
  },
  buttonText: {
    fontFamily: 'WorkSans_400Regular',
    color: 'white',
    textAlign: 'center',
    width: '100%',
    fontSize: 28
  }
})

export default FirstScreen