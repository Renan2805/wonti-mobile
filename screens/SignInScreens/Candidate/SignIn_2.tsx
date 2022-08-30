import { useState } from 'react' 
import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import { RootStackScreenProps } from "../../../types"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"


const SignIn_2 = ({navigation, route}: RootStackScreenProps<'SignIn_2c'>) => {

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [rg, setRg] = useState('')

  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/perfil.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Dados Pessoais
        </Text>
        <View style={styles.inputs}>
          <TextInput 
            placeholder={'Nome'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'Sobrenome'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'RG'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'CPF'}
            style={styles.input}
          />
        </View>
        <View style={{width: '90%'}}>
          <NextButton _onPress={() => navigation.navigate('SignIn_3c', {
            nome: nome,
            sobrenome: sobrenome,
            rg: rg,
            cpf: route.params.cpf,
            senha: route.params.senha
          })}/>
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
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
    textAlign: 'center'
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

export default SignIn_2