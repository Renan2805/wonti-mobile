import React, { useState, useEffect, SetStateAction } from 'react' 
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native"
import { validate } from 'gerador-validador-cpf'
import { cnpj } from 'cpf-cnpj-validator'
import { RootStackScreenProps } from "../../../types"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import { storeData } from '../../../hooks/useAsyncStorage'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

const Cadastro1 = ({ navigation }: RootStackScreenProps<'cadastro1'>) => {

  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [descricao, setDescricao] = useState('')
  const [show, setShow] = useState(false)

  const [fieldsInError, setFieldsInError] = useState<string[]>([])

  const goNext = () => {

    const dadosPessoais = {
      nome: nome,
      cnpj: cnpj,
      descricao: descricao
    }

    storeData('dadosPessoais', JSON.stringify(''))

    navigation.navigate('cadastro2')
  }
  
  const checkNome = (name: string) => {
    const reg: RegExp = /[a-zA-Z]/
    console.log('reg: ' + reg.test(name))
    return reg.test(name)
  }


  const mascaraRg = (v: string) => {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4")
    return v
  }

  const mascaraCnpj = (strCnpj: string) => {
    strCnpj = strCnpj.replace(/\D/g,"")
    strCnpj = strCnpj.replace(/(\d{3})(\d)/,"$1.$2")
    
    strCnpj = strCnpj.replace(/(\d{3})(\d)/,"$1.$2")
    strCnpj = strCnpj.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return strCnpj
  }

  const onChange = (event: DateTimePickerEvent, selectedDate: SetStateAction<Date> | undefined) => {
    const currentDate = selectedDate
    // @ts-ignore
    setDate(currentDate)
    setShow(false)
  };

  const checkDate = (date: Date) => {
    const today = new Date()
    const birthDate = date
    var age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    console.log('Age:', age)
    if(age < 18) return false
    else return true
    
  }

   const _validate = () => {
    setFieldsInError([])
    if(!checkNome(nome)) {
      setFieldsInError(fields => [...fields, 'name'])
      return
    }
    if(!validate(cnpj)) {
      setFieldsInError(fields => [...fields, 'cnpj'])
      return
    }
    if(!validate(descricao)) {
        setFieldsInError(fields => [...fields, 'descricao'])
        return
      }
    goNext()
  }

  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/empresa.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Informações da empresa
        </Text>
        <View style={styles.inputs}>
          <TextInput 
            placeholder={'Nome da empresa'}
            style={[styles.input, {borderColor: fieldsInError?.includes('name') ? 'red' : '#848484'}]}
            onChangeText={text => setNome(text)}
          />
          <TextInput 
            placeholder={'CNPJ'}
            style={[styles.input, {borderColor: fieldsInError?.includes('cpf') ? 'red' : '#848484'}]}
            onChangeText={text => setCnpj(text)}
            value={mascaraCnpj(cnpj)}
          />
          <TextInput 
            placeholder={'Descrição'}
            style={[styles.input, {borderColor: fieldsInError?.includes('descricao') ? 'red' : '#848484'}]}
          />
        </View>
        <View style={{width: '90%'}}>
          <NextButton _onPress={() =>  navigation.navigate('cadastro2')}/>
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

export default Cadastro1