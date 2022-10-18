import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import * as navigation from 'react-navigation'
import * as cpf_cnpj from 'cpf-cnpj-validator'
import { RootStackScreenProps } from "../../../types"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import { useState } from "react"



const SignIn_2 = ({navigation, route}: RootStackScreenProps<'SignIn_2e'>) => {

  const [nome, setNome] = useState<string>('')
  const [cnpj, setCnpj] = useState<string>('')

  const [errorMessage, setErrorMessage] = useState<string>()

  const checkNome = (name: string) => {
    const reg: RegExp = /[a-zA-Z]/
    console.log('reg: ' + reg.test(name))
    return reg.test(name)
  }

  const checkCnpj = (c: string) => {
    return cpf_cnpj.cnpj.isValid(c)
  }

  const mascaraCnpj = (c: string) => {
    let reg = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/
    c = c.replace(/\D/g, '')
    c = c.replace(reg, "$1.$2.$3/$4-$5")
    return c
  }

  const _validate = () => {
    setErrorMessage('')
    if(!checkNome(nome)) {
      setErrorMessage('Nome Inválido')
      return
    }
    if(!checkCnpj(cnpj)) {
      setErrorMessage('CNPJ Inválido')
      return
    }
  }

  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/info-empresa.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Informações{'\n'}
          da Empresa
        </Text>
        <Text>{errorMessage}</Text>
        <View style={styles.inputs}>
          <TextInput 
            placeholder={'Nome da Empresa'}
            style={styles.input}
            onChangeText={setNome}
            value={nome}
          />
          <TextInput 
            placeholder={'CNPJ'}
            style={[styles.input, {textAlign: 'justify'}]}
            onChangeText={setCnpj}
            value={mascaraCnpj(cnpj)}
          />
          <TextInput 
            placeholder={'Descrição'}
            numberOfLines={3}
            multiline={true}
            maxLength={140}
            style={styles.input}
          />
          <TextInput 
            placeholder={'Endereço'}
            style={styles.input}
          />
        </View>
        <View style={{width: '90%'}}>
          <NextButton _onPress={() => _validate()}/>                                                                                                                                                                                                           
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
    maxWidth: '100%',
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