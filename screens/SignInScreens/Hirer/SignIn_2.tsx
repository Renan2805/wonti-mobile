import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import * as navigation from 'react-navigation'
import * as cpf_cnpj from 'cpf-cnpj-validator'
import { RootStackScreenProps } from "../../../types"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import { useState } from "react"
import { storeData } from "../../../hooks/useAsyncStorage"



const SignIn_2 = ({navigation, route}: RootStackScreenProps<'SignIn_2e'>) => {

  const [nome, setNome] = useState<string>('')
  const [cnpj, setCnpj] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const [errorMessage, setErrorMessage] = useState<string>()
  const [fieldsInError, setFieldsInError] = useState<string[]>([])

  const goNext = () => {
    const data = {
      nome: nome,
      cnpj: cnpj,
      wpp: number,
      desc: description
    }

    storeData('dados-empresariais', JSON.stringify(data))
    navigation.navigate('SignIn_3e')
  }

  const checkNome = (name: string) => {
    const reg: RegExp = /[a-zA-Z]/
    console.log('reg: ' + reg.test(name))
    return reg.test(name)
  }

  const checkCnpj = (c: string) => {
    return cpf_cnpj.cnpj.isValid(c)
  }

  const mascaraCnpj = (c: string) => {
    c = c.replace(/\D/g, '')
    c = c.replace(/(\d{2})(\d)/, '$1.$2')
    c = c.replace(/(\d{3})(\d)/, '$1.$2')
    c = c.replace(/(\d{3})(\d)/, '$1/$2')
    c = c.replace(/(\d{4})(\d)/, '$1-$2')
    return c
  }

  const checkDesc = (d: string) => {
    if(d.length < 50 || d.length > 140) return false
    else return true
  }

  const mascaraNumber = (n: string) => {
    n = n.replace(/\D/, '')
    if(n.length == 11) n = n.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    else if(n.length == 12) n = n.replace(/(\d{2})(\d{6})(\d{4})/, '($1) $2-$3')
    return n
  }


  const _validate = () => {
    setErrorMessage('')
    setFieldsInError([])
    if(!checkNome(nome)) {
      setErrorMessage('Nome Inválido')
      setFieldsInError(fields => [...fields, 'nome'])
      return
    }
    if(!checkCnpj(cnpj)) {
      setErrorMessage('CNPJ Inválido')
      setFieldsInError(fields => [...fields, 'cnpj'])
      return
    }
    if(!checkDesc(description)) {
      setErrorMessage('Descrição deve ter no minimo 50 caracteres')
      setFieldsInError(fields => [...fields, 'desc'])
      return
    }
    goNext()
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
        <Text style={styles.error}>{errorMessage}</Text>
        <View style={styles.inputs}>
          <TextInput 
            placeholder={'Nome da Empresa'}
            style={[styles.input, { borderColor: fieldsInError.includes('nome') ? 'red' : '#848484'}]}
            onChangeText={setNome}
            value={nome}
          />
          <TextInput 
            placeholder={'CNPJ'}
            style={[styles.input, { borderColor: fieldsInError.includes('cnpj') ? 'red' : '#848484'}]}
            onChangeText={setCnpj}
            value={mascaraCnpj(cnpj)}
            maxLength={18}
            keyboardType={'number-pad'}
          />
          <TextInput 
            placeholder={'WhatsApp'}
            style={[styles.input, { borderColor: fieldsInError.includes('cnpj') ? 'red' : '#848484'}]}
            onChangeText={text => setNumber(text.replace(/\D/g, ''))}
            value={mascaraNumber(number)}
            keyboardType={'number-pad'}
          />
          <View
            style={[styles.input, { borderColor: fieldsInError.includes('desc') ? 'red' : '#848484'}]}
          >
            <TextInput 
              placeholder={'Descrição'}
              numberOfLines={4}
              multiline={true}
              maxLength={140}
              style={{textAlignVertical: 'top', fontFamily: 'WorkSans_300Light', fontSize: 18, color: '#848484', margin: 0}}
              onChangeText={setDescription}
              value={description}
            />
            <Text style={{alignSelf: 'flex-end', color: description.length == 140 ? 'red' : '#848484'}}>{description.length}/140</Text>
          </View>
        </View>
        <View style={{width: '90%'}}>
          <NextButton _onPress={() => _validate()}/>                                                                                                                                                                                                           
        </View>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  image: {
    height: 100,
    width: 100
  },
  title: {
    maxWidth: '100%',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
    textAlign: 'center'
  },
  error: {
    fontFamily: 'WorkSans_600SemiBold',
    color: 'red'
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