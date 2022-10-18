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
import { BsArrowsAngleExpand } from 'react-icons/bs'

const SignIn_2 = ({ navigation }: RootStackScreenProps<'SignIn_2c'>) => {

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [rg, setRg] = useState('')
  const [cpf, setCpf] = useState('')

  const [date, setDate] = useState<Date>(new Date())
  const [show, setShow] = useState(false)

  const [fieldsInError, setFieldsInError] = useState<string[]>([])

  const goNext = () => {

    const dadosPessoais = {
      nome: nome,
      sobrenome: sobrenome,
      rg: rg,
      cpf: cpf,
      dataDeNascimento: date
    }

    storeData('dadosPessoais', JSON.stringify(dadosPessoais))

    navigation.navigate('SignIn_5c')
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

  const mascaraCpf = (strCPF: string) => {
    strCPF = strCPF.replace(/\D/g,"")
    strCPF = strCPF.replace(/(\d{3})(\d)/,"$1.$2")
    
    strCPF = strCPF.replace(/(\d{3})(\d)/,"$1.$2")
    strCPF = strCPF.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return strCPF
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
    if(!checkNome(sobrenome)) {
      setFieldsInError(fields => [...fields, 'sobrenome'])
      return
    }
    if(rg.length < 9 || rg.length > 9) {
      setFieldsInError(fields => [...fields, 'rg'])
      return
    }
    if(!validate(cpf)) {
      setFieldsInError(fields => [...fields, 'cpf'])
      return
    }
    if(!checkDate(date)) {
      setFieldsInError(fields => [...fields, 'date'])
      return
    }
    goNext()
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
          Dados{'\n'}
          Pessoais
        </Text>
        <View style={styles.inputs}>
          <TextInput 
            placeholder={'Nome'}
            style={[styles.input, {borderColor: fieldsInError?.includes('name') ? 'red' : '#848484'}]}
            onChangeText={text => setNome(text)}
          />
          <TextInput 
            placeholder={'Sobrenome'}
            style={[styles.input, {borderColor: fieldsInError?.includes('sobrenome') ? 'red' : '#848484'}]}
            onChangeText={text => setSobrenome(text)}
            />
          <TextInput 
            placeholder={'RG'}
            style={[styles.input, {borderColor: fieldsInError?.includes('rg') ? 'red' : '#848484'}]}
            onChangeText={text => setRg(text)}
            value={mascaraRg(rg)}
          />
          <TextInput 
            placeholder={'CPF'}
            style={[styles.input, {borderColor: fieldsInError?.includes('cpf') ? 'red' : '#848484'}]}
            onChangeText={text => setCpf(text)}
            value={mascaraCpf(cpf)}
          />
          <View
            style={[styles.input, {
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderColor: fieldsInError?.includes('date') ? 'red' : '#848484'
            }]}
          >
            <Text style={{
              fontFamily: 'WorkSans_300Light',
              fontSize: 18,
              color: '#848484',
            }}>
              {
                date == undefined ?
                'Data de nascimento'
                :
                date.toLocaleDateString('pt-BR')
              }              
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShow(!show)
              }}
            >
              <Ionicons name="ios-arrow-down" size={24} color="black" />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                onChange={(event, date) => onChange(event, date)}
              />
            )}
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