import { useState } from 'react'
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import Axios from 'axios'
import SelectDropDown from 'react-native-select-dropdown'
import { FontAwesome } from '@expo/vector-icons';
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import React from "react"
import { getData, storeData } from '../../../hooks/useAsyncStorage'
import { RootStackScreenProps } from '../../../types'

const SignIn_5 = ({navigation}: RootStackScreenProps<'SignIn_5c'>) => {

  type Endereco = {
    rua: string,
    numero: string,
    complemento: string,
    bairro: string,
    cep: string,
    cidade: string,
    uf: string
  }

  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')

  const [errorMessage, setErrorMessage] = useState<string>('')
  const [fieldsInError, setFieldsInError] = useState<string[]>([])
  const [buscandoCep, setBuscandoCep] = useState<boolean>(false)

  const listaUf = [
    'AC', 'AL', 'AP',
    'AM', 'BA', 'CE',
    'DF', 'ES', 'GO',
    'MA', 'MT', 'MS',
    'MG', 'PA', 'PB',
    'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS',
    'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ]

  const goNext = () => {

    const enderecoObj: Endereco = {
      rua: rua,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cep: cep,
      cidade: cidade,
      uf: uf
    }

    const enderecoStr = JSON.stringify(enderecoObj)

    storeData('endereco', enderecoStr)
    navigation.navigate('SignIn_6c')
  }

  const checkCep = (CEP: string) => {
    const reg = /^[0-9]{8}$/
    return reg.test(CEP)
  }

  const mascaraCep = (cep: string) => {
    const reg = /(\d{5})(\d{3})/
    cep = cep.replace(reg, '$1-$2')
    return cep
  }

  const buscaCep = async () => {
    setBuscandoCep(true)
    setErrorMessage('')
    if(!checkCep(cep)) {
      setErrorMessage('Cep inválido')
      setBuscandoCep(false)
      return
    }
    await Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => {
        if(res.data.erro == true) setErrorMessage('Erro ao pesquisar CEP')
        setRua(res.data.logradouro)
        setBairro(res.data.bairro)
        setCidade(res.data.localidade)
        setUf(res.data.uf)
      })
      .finally(() => {
        setBuscandoCep(false)
      })
      .catch(e => {
        setErrorMessage('Erro ao pesquisar o CEP')
      })
  }

  const _validate = () => {
    setFieldsInError([])
    if(rua === '') {
      setFieldsInError(fields => [...fields, 'rua'])
      setErrorMessage('Endereço inválido')
      return
    }
    if(numero == '') {
      setFieldsInError(fields => [...fields, 'numero'])
      setErrorMessage('Número inválido')
      return
    }
    goNext()
  }

  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/casa.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Endereço
        </Text>
        <Text style={{fontFamily: 'WorkSans_500Medium', color: 'red', fontSize: 16}}>{errorMessage}</Text>
        <View style={styles.inputs}>
          <View style={styles.cepWrapper}> 
            <TextInput 
              placeholder={'CEP'}
              style={{
                fontFamily: 'WorkSans_300Light',
                fontSize: 18,
                color: '#848484',
                marginLeft: 7,
                width: '80%',
              }}
              onChangeText={text => setCep(text)}
              value={mascaraCep(cep)}
              keyboardType={'numeric'}
            />
            <TouchableOpacity
              style={{backgroundColor: 'black', borderRadius: 20, justifyContent: 'center', paddingHorizontal: 20}}
              onPress={() => buscaCep()}
            >
              {
                buscandoCep ?
                  <ActivityIndicator size={'small'} color={'white'}/>
                  :
                  <FontAwesome name="search" size={12} color="white" />
              }
            </TouchableOpacity>
          </View>
          <TextInput 
            placeholder={'Rua'}
            style={[styles.input, {borderColor: fieldsInError.includes('rua') ? 'red' : '#848484'}]}
            editable={false}
            value={rua}
          />
          <View style={styles.inputsHorizontal}>
            <TextInput 
              placeholder={'Nº'}
              style={[styles.input, {maxWidth: '40%', borderColor: fieldsInError.includes('numero') ? 'red' : '#848484'}]}
              onChangeText={text => setNumero(text)}
            />
            <TextInput 
              placeholder={'Complemento'}
              style={[styles.input, {maxWidth: '55%'}]}
              onChangeText={text => setComplemento(text)}
            />
          
          </View>
          <TextInput 
            placeholder={'Bairro'}
            style={styles.input}
            editable={false}
            value={bairro}
          />
          <View style={styles.inputsHorizontal}>
            <TextInput 
              placeholder={'Cidade'}
              style={[styles.input, {maxWidth: '65%'}]}
              editable={false}
              value={cidade}
            />
            <SelectDropDown
              data={listaUf}
              disabled={true}
              defaultValue={uf}
              rowTextForSelection={(item) => item}
              defaultButtonText={'UF'}
              buttonTextAfterSelection={(item) => item}
              onSelect={item => setUf(item)}
              buttonStyle={{maxWidth: '30%', borderWidth: 1, borderRadius: 30, borderColor: '#848484'}}
              buttonTextStyle={{width: '100%', fontFamily: 'WorkSans_300Light', fontSize: 18, color: '#848484'}}
              dropdownStyle={{borderRadius: 30}}
            />
          
          </View>
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
  inputsHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  input: {
    fontFamily: 'WorkSans_300Light',
    fontSize: 18,
    color: '#848484',

    borderWidth: 1,
    borderColor: '#848484',
    borderRadius: 30,

    paddingVertical: 10,
    paddingHorizontal: 17,
    width: '100%'
  },
  cepWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#848484',
    paddingVertical: 10,
    paddingHorizontal: 10
  }
})

export default SignIn_5