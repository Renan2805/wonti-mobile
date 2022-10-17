import { useState } from 'react'
import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import { getData, storeData } from '../../../hooks/useAsyncStorage'
import { RootStackScreenProps } from '../../../types'


const SignIn_6 = ({navigation}: RootStackScreenProps<'SignIn_6c'>) => {

  const [instituicao, setInstituicao] = useState('')
  const [nivel, setNivel] = useState('')
  const [qualificacao, setQualificacao] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [fieldsInError, setFieldsInError] = useState<string[]>([])

  const goNext = () => {
    navigation.navigate('SignIn_7c', {
      instituicao: instituicao,
      nivel: nivel,
      qualificacao: qualificacao
    })
  }

  const _validate = () => {
    setFieldsInError([])
    if(instituicao === '') {
      setFieldsInError(fields => [...fields, 'inst'])
      setErrorMessage('Instituição inválida')
      return
    }
    if(nivel === '') {
      setFieldsInError(fields => [...fields, 'nivel'])
      setErrorMessage('Nível acadêmico inválido')
      return
    }
    if(qualificacao === '') {
      setFieldsInError(fields => [...fields, 'quali'])
      setErrorMessage('Qualificção inválida')
      return
    }
    goNext()
  }

  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/formacao.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Formação Academica
        </Text>
        <Text style={{fontFamily: 'WorkSans_500Medium', color: 'red', fontSize: 16}}>{errorMessage}</Text>
        <View style={styles.inputs}>
          <Text style={styles.subTitle}>
            Instituição de ensino
          </Text>
          <TextInput 
            placeholder={'Ex: ETEC'}
            style={[styles.input, {borderColor: fieldsInError.includes('inst') ? 'red' : '#848484'}]}
            onChangeText={text => setInstituicao(text)}
          />
          <Text style={styles.subTitle}>
            Nivel Acadêmico
          </Text>
          <TextInput 
            placeholder={'Ex: Ensino Médio'}
            style={[styles.input, {borderColor: fieldsInError.includes('nivel') ? 'red' : '#848484'}]}
            onChangeText={text => setNivel(text)}
          />
          <Text style={styles.subTitle}>
            Qualificação
          </Text>
          <TextInput 
            placeholder={'Ex: Informática'}
            style={[styles.input, {borderColor: fieldsInError.includes('quali') ? 'red' : '#848484'}]}
            onChangeText={text => setQualificacao(text)}
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
    width: '35%',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24
  },
  subTitle: {
    fontFamily: 'WorkSans_600SemiBold',
    fontSize: 18,
    color: '#E3175A'
  },
  inputs: {
    width: '100%',
    flex: 1,
    justifyContent:'space-around',
    maxHeight: '40%'
  },
  inputsHorizontal: {
    flexDirection: 'row',
    gap: 10
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

export default SignIn_6