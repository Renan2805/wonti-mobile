import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import { useState } from "react"
import { storeData } from "../../../hooks/useAsyncStorage"
import { RootStackScreenProps } from "../../../types"

const SignIn_4 = ({navigation}: RootStackScreenProps<'SignIn_4c'>) => {

  const [telefone, setTelefone] = useState('')
  const [celular, setCelular] = useState('')
  const [email, setEmail] = useState('')

  const [confirmaEmail, setConfirmaEmail] = useState('')

  const goNext = () => {
    storeData('telefone', telefone)
    storeData('celular', celular)
    storeData('email', email)
    navigation.navigate('SignIn_5c')
  }

  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/contato.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Contato
        </Text>
        <View style={styles.inputs}>
          <TextInput 
            placeholder={'Telefone'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'Celular'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'Email'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'Confirmar Email'}
            style={styles.input}
          />
        </View>
        <View style={{width: '90%'}}>
          <NextButton _onPress={() => goNext()}/>
        </View>
        <Footer />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    height: '90%',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  image: {
    height: 130,
    width: 130
  },
  title: {
    width: '30%',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24
  },
  inputs: {
    width: '100%',
    flex: 1,
    justifyContent:'space-around',
    maxHeight: '40%'
  },
  input: {
    fontFamily: 'WorkSans_300Light',
    fontSize: 18,
    color: '#848484',

    borderWidth: 1,
    borderColor: '#848484',
    borderRadius: 30,

    paddingVertical: 14,
    paddingHorizontal: 17,
    width: '100%'
  }
})

export default SignIn_4