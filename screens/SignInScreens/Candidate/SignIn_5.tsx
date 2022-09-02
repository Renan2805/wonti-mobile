import { useState } from 'react'
import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import SelectDropDown from 'react-native-select-dropdown'
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import React from "react"
import { storeData } from '../../../hooks/useAsyncStorage'
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

  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [cep, setCep] = useState('')
  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')

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
        <View style={styles.inputs}>
          <TextInput 
            placeholder={'Rua'}
            style={styles.input}
            onChangeText={text => setRua(text)}
          />
          <View style={styles.inputsHorizontal}>
            <TextInput 
              placeholder={'Nº'}
              style={[styles.input, {maxWidth: '40%'}]}
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
            onChangeText={text => setBairro(text)}
          />
          <TextInput 
            placeholder={'CEP'}
            style={styles.input}
            onChangeText={text => setCep(text)}
          />
          <View style={styles.inputsHorizontal}>
            <TextInput 
              placeholder={'Cidade'}
              style={[styles.input, {maxWidth: '65%'}]}
              onChangeText={text => setCidade(text)}
            />
            <SelectDropDown
            data={listaUf}
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
  }
})

export default SignIn_5