import { useState, useEffect } from 'react' 
import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import { RootStackScreenProps } from "../../../types"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import { storeData } from '../../../hooks/useAsyncStorage'

const SignIn_2 = ({navigation, route}: RootStackScreenProps<'SignIn_2c'>) => {

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [rg, setRg] = useState('')
  const [cpf, setCpf] = useState('')

  const goNext = () => {

    const dadosPessoais = {
      nome: nome,
      sobrenome: sobrenome,
      rg: rg,
      cpf: cpf
    }

    storeData('dadosPessoais', JSON.stringify(dadosPessoais))

    navigation.navigate('SignIn_4c')
  }

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
            onChangeText={text => setNome(text)}
          />
          <TextInput 
            placeholder={'Sobrenome'}
            style={styles.input}
            onChangeText={text => setSobrenome(text)}
          />
          <TextInput 
            placeholder={'RG'}
            style={styles.input}
            onChangeText={text => setRg(text)}
          />
          <TextInput 
            placeholder={'CPF'}
            style={styles.input}
            onChangeText={text => setCpf(text)}
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