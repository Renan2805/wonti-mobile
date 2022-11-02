import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from "react-native"
import { auth } from '../../config/firebase'
import { AuthError, fetchSignInMethodsForEmail } from '@firebase/auth'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import Header from "../../components/Header"

import NextButton from './NextButton'
import { RootStackScreenProps } from '../../types'
import { storeData } from '../../hooks/useAsyncStorage'

const SignIn_1 = ({navigation, route}: RootStackScreenProps<'SignIn_1'>) => {

  const [conditionsRead, setConditionsRead] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isUser, setIsUser] = useState(route.params.isUser)

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [teste, setTeste] = useState('')

  const goNext = () => {
    storeData('email', user)
    storeData('password', password)

    if (isUser) navigation.navigate('SignIn_2c')
    else navigation.navigate('SignIn_2e')
  }

  const checkEmail = (email: string) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return validRegex.test(email)
  }

  const checkPassword = (password: string) => {
    if(password.length < 6) return false
    else return true
  }

  const mascaraSenha = () => {
    const reg = /./g
    return password.replace(reg, '•')
  }

  const checkIfEmailIsUsed = async (email: string) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email)
      if(methods) {
        console.log('Methods: ', methods)
        if(methods.length > 0) return true
        else return false
      }
    } catch(e: AuthError | any) {
      setErrorMessage('Erro por favor tente novamente mais tarde')
    }
  }

  const _validate = async () => {
    setIsLoading(true)
    if(!checkEmail(user)) {
      setErrorMessage('Email Inválido')
      setIsLoading(false)
      return
    }
    if(await checkIfEmailIsUsed(user)) {
      setErrorMessage('Email já em uso')
      setIsLoading(false)
      return
    }
    if(!checkPassword(password)) {
      setErrorMessage('A senha deve ter mais do que 6 caracteres')
      setIsLoading(false)
      return
    }
    if(!conditionsRead) {
      setErrorMessage('Aceite os termos de uso antes de continuar')
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    goNext()
  }

  return (
    // <View style={{height: '100%'}}>
    //   <Header />
    //   <NextButton _onPress={() => {}}/>
    //   <BouncyCheckbox 
    //     onPress={(isChecked: boolean) => setConditionsRead(isChecked)} 
    //     text={'Aceito os termos de uso'}
    //     textStyle={{fontFamily: 'WorkSans_600SemiBold', fontSize: 14, color: '#4A4949', textDecorationLine: 'none', textAlign: 'right', width: '100%'}}
    //     style={{ justifyContent: 'flex-end', marginTop: 10  }}
    //     size={17}
    //     fillColor={'#4A4949'}
    //     iconStyle={{ borderRadius: 6}}
    //     useNativeDriver={false}
    //   />
    // </View>

    <View style={{height: '100%'}}>
    <Header />
    <View style={styles.container}>
      <View style={styles.section_1}>
        <Text style={styles.title}>Cadastre-se </Text>
        <Text style={{fontFamily: 'WorkSans_600SemiBold', fontSize: 14, color: 'red', textAlign: 'right'}}>{errorMessage}</Text>
        <View style={[styles.inputs, { minHeight: 110}]}>
          <TextInput 
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            placeholder={ 'Email' }
            style={styles.input}
            onChangeText={(text) => setUser(text)}
            value={user}
          />
          <View style={{maxHeight: 10, minHeight: 5}}/>
          <View
            style={[styles.input, {flexDirection: 'row', justifyContent: 'space-between'}]}
          >
            <TextInput 
              style={{fontFamily: 'WorkSans_300Light', fontSize: 18, color: '#848484', width: '80%'}}
              placeholder={'Senha'}
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
              value={password}

            />
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="black" onPress={() => setShowPassword(!showPassword)}/>
          </View>
        </View>
        <View style={{
          justifyContent: 'center',
        }}>
          <BouncyCheckbox 
            onPress={(isChecked: boolean) => !isChecked ? setConditionsRead(false) : setIsModalOpen(true)} 
            isChecked={conditionsRead}
            text={'Aceito os termos de uso'}
            textStyle={{fontFamily: 'WorkSans_600SemiBold', fontSize: 14, color: '#4A4949', textDecorationLine: 'none', textAlign: 'right', width: '100%'}}
            style={{ justifyContent: 'flex-end', marginTop: 10  }}
            size={17}
            fillColor={'#4A4949'}
            iconStyle={{ borderRadius: 6}}
            useNativeDriver={false}
          />
        </View>
        <NextButton _onPress={() => _validate()} _isLoading={isLoading}/>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', height: '10%', marginVertical: 20}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={{width: 70, textAlign: 'center', fontFamily: 'WorkSans_400Regular', fontSize: 16}}>ou</Text>
          </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
      <View style={styles.section_2}>
        <TouchableOpacity style={styles.button2}>
          <FontAwesome
            name={'google'} 
            size={28}
          />
          <Text style={{
            fontFamily: 'Numans_400Regular',
            fontSize: 18,
            textAlign: 'center',
            color: 'black'
          }}>
            Continue Com Google
          </Text>
          <View style={{width: 28}}></View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button2, { borderColor: '#3B5998'}]}>
          <FontAwesome
            name={'facebook-f'} 
            size={28}
            color={'#3B5998'}
          />
          <Text style={{
            fontFamily: 'Numans_400Regular',
            fontSize: 18,
            textAlign: 'center',
            color: '#3B5998'
          }}>
            Continue Com Facebook
          </Text>
          <View style={{width: 10}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen') }>
          <Text style={{fontFamily: 'WorkSans_400Regular', maxWidth: '110%', textAlign: 'center'}}>
            Já possui conta?{'\n'}
            Faça 
            <Text style={{color: '#CA0747', fontFamily: 'WorkSans_600SemiBold'}}>
              {' login'}
            </Text>
          </Text> 
        </TouchableOpacity>
      </View>
    </View>

    <Modal
      visible={isModalOpen}
      animationType={'slide'}
      transparent={false}
    >
      <View style={styles.modal}>
        <Text>Teste</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setConditionsRead(true)
            setIsModalOpen(false)
          }}
        >
          <Text style={styles.buttonText}>Aceito os termos</Text>
        </TouchableOpacity>
      </View>
    </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    paddingHorizontal: 30
  },
  title: {
    fontFamily: 'Montserrat_700Bold',
    color: '#FF0356',
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 20
  },
  section_1: {
    width: '100%',
    minHeight: '40%',
    maxHeight: '50%',
  },
  inputs: {
    width: '100%',
    maxHeight: 130,
    minHeight: 110,
    flex: 1,
    justifyContent: 'space-between'
  },
  input: {
    fontFamily: 'WorkSans_300Light',
    fontSize: 18,
    color: '#848484',

    borderWidth: 1,
    borderColor: '#848484',
    borderRadius: 30,

    paddingVertical: 14,
    paddingHorizontal: 17
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'black',
    borderRadius: 30,
    marginTop: '5%'
  },
  buttonText: {
    fontFamily: 'WorkSans_500Medium',
    fontSize: 23,
    color: 'white',
    textAlign: 'center'
  },
  section_2: {
    width: '100%',
    minHeight: '30%',
    maxHeight: 200,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button2: {
    paddingVertical: 15,
    paddingHorizontal: 17,
    width: '100%',
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    left: 0
  },
  modal: {
    padding: 10
  }
})

export default SignIn_1