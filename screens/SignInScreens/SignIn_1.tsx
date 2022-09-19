import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Button } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { FontAwesome } from '@expo/vector-icons'
import Header from "../../components/Header"

import NextButton from './NextButton'
import { RootStackScreenProps } from '../../types'
import { storeData, getData } from '../../hooks/useAsyncStorage'

const SignIn_1 = ({navigation, route}: RootStackScreenProps<'SignIn_1'>) => {

  const [conditionsRead, setConditionsRead] = useState(false)
  const [isUser, setIsUser] = useState(route.params.isUser)

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  
  const [isLoading, setIsLoading] = useState(true)
  const [teste, setTeste] = useState('')
  
  const goNext = () => {
    storeData('email', user)
    storeData('password', password)

    if (isUser) navigation.navigate('SignIn_2c')
    else navigation.navigate('SignIn_2e')
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
        <Text style={styles.title}>Cadastre-se {teste}</Text>
        <View style={[styles.inputs, { minHeight: 110}]}>
          <TextInput 
            placeholder={ 'Email' }
            style={styles.input}
            onChangeText={(text) => setUser(text)}
          />
          <View style={{maxHeight: 10, minHeight: 5}}/>
          <TextInput 
            placeholder={'Senha'}
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{
          justifyContent: 'flex-end',
        }}>
          <BouncyCheckbox 
            onPress={(isChecked: boolean) => setConditionsRead(isChecked)} 
            text={'Aceito os termos de uso'}
            textStyle={{fontFamily: 'WorkSans_600SemiBold', fontSize: 14, color: '#4A4949', textDecorationLine: 'none', textAlign: 'right', width: '100%'}}
            style={{ justifyContent: 'flex-end', marginTop: 10  }}
            size={17}
            fillColor={'#4A4949'}
            iconStyle={{ borderRadius: 6}}
            useNativeDriver={false}
          />
          <NextButton _onPress={() => goNext()}/>
        </View>
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
          <View style={{width: 10}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {} }>
          <Text style={{fontFamily: 'WorkSans_400Regular', maxWidth: '30%', textAlign: 'center'}}>
            Já possui conta?
            Faça 
            <Text style={{color: '#CA0747', fontFamily: 'WorkSans_600SemiBold'}}>
              {' login'}
            </Text>
          </Text> 
        </TouchableOpacity>
      </View>
    </View>
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
  }
})

export default SignIn_1