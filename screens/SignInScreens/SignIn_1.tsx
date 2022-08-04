import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from 'react-icons/fa'
import Header from "./Header"

import { useFonts } from "expo-font"
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat"
import { WorkSans_300Light, WorkSans_400Regular, WorkSans_500Medium, WorkSans_600SemiBold } from '@expo-google-fonts/work-sans'
import { Numans_400Regular } from '@expo-google-fonts/numans'
import NextButton from './NextButton'

interface SignIn_1Props {
  isUser: boolean // se for falso significa que uma empresa está se cadastrando
}

const SignIn_1 = ({ isUser }:SignIn_1Props) => {

  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    Numans_400Regular
  })

  const [conditionsRead, setConditionsRead] = useState(false)

  return (
    <View style={{height: '100%'}}>
    <Header />
    <View style={styles.container}>
      <View style={styles.section_1}>
        <Text style={styles.title}>Cadastre-se</Text>
        <View style={[styles.inputs, { minHeight: 110}]}>
          <TextInput 
            placeholder={ isUser ? 'CPF' : 'CNPJ' }
            style={styles.input}
          />
          <TextInput 
            placeholder={'Senha'}
            style={styles.input}
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
          <NextButton _onPress={() => {}}/>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', height: '10%', marginVertical: '5%'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={{width: 70, textAlign: 'center', fontFamily: 'WorkSans_400Regular', fontSize: 16}}>ou</Text>
          </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
      <View style={styles.section_2}>
        <TouchableOpacity style={styles.button2}>
          <FcGoogle 
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
          <FaFacebookF 
            size={28}
            fill={'#3B5998'}
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
        <Text style={{fontFamily: 'WorkSans_400Regular', width: '14ch', textAlign: 'center'}}>
          Já possui conta?
          Faça <Text style={{color: '#CA0747', fontFamily: 'WorkSans_600SemiBold'}}>login</Text>
        </Text>
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
    maxHeight: '50%'
  },
  inputs: {
    width: '100%',
    maxHeight: 120,
    minHeight: 100,
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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
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