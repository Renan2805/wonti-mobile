import React, { useState } from 'react'
import { View, KeyboardAvoidingView, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { useFonts } from 'expo-font';
import { Montserrat_600SemiBold, Montserrat_800ExtraBold, } from '@expo-google-fonts/montserrat';
import { WorkSans_300Light, WorkSans_400Regular, WorkSans_500Medium, WorkSans_600SemiBold } from '@expo-google-fonts/work-sans'

import { BsArrowLeftShort } from 'react-icons/bs'

export default function LoginScreen() {
  const fontsLoaded = useFonts({
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold
  })
  
  const [active, setActive] = useState(true)

  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingVertical: 0, margin: 0}]}>
        <TouchableOpacity>
          <BsArrowLeftShort size={45}/>
        </TouchableOpacity>
        <Image 
          source={require('../assets/images/logoWonti.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/login-screen.png')}
          style={styles.image}
        />
      </View>
      <KeyboardAvoidingView style={styles.pinkContainer}>
        <View style={styles.loginContainer}>
          <View style={styles.ce}>
            <TouchableOpacity onPress={() => setActive(true)}>
              <Text style={active ? styles.ceTextActive : styles.ceText}>
                Candidatas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive(false)}>
              <Text style={active ? styles.ceText : styles.ceTextActive}>
                Empresas
              </Text>
            </TouchableOpacity>
          </View>
          <Spacer height={40}/>
          <TextInput placeholder={active ? 'CPF' : 'CNPJ' } style={styles.input}/>
          <Spacer height={10}/>
          <TextInput placeholder='Senha' style={styles.input}/>
          <Text style={{textAlign: 'right', fontFamily: 'WorkSans_400Regular', fontSize: 15}}>Esqueceu a senha?</Text>
          <TouchableOpacity style={styles.loginButton}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 23,
                fontFamily: 'WorkSans_500Medium',
                textAlign: 'center'
              }}
            >
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontFamily: 'WorkSans_400Regular', fontSize: 17, textAlign: 'center', marginTop: 35}}>Não possui cadastro?</Text>
        <Text style={{fontFamily: 'WorkSans_600SemiBold', fontSize: 17, textAlign: 'center', color: '#CA0747'}}>Cadastre-se</Text>
      </KeyboardAvoidingView>
    </View>
  )
}

interface SpacerProps {
  height: number
}

const Spacer = ({ height }: SpacerProps) => {
  return (
    <View style={{height: height}}></View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    Height: '100%',
    flex: 1
  },
  header: {
    width: '100%',
    height: '10%',
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 34
  },
  imageContainer: {
    width: '100%',
    height: '30%',
    alignItems: 'center'
  },
  image: {
    aspectRatio: 1 / 1,
    width: '60%'
  },
  pinkContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: '#FFEEF5',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingTop: 40,
    paddingHorizontal: 25
  },
  loginContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderRadius: 25,
    backgroundColor: 'white',
    borderColor: 'rgba(255, 3, 86, 0.15)',
    borderWidth: 1
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#848484',
    borderRadius: 25,
    padding: 15,
    fontFamily: 'WorkSans_300Light,'
  },
  ce: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ceText: {
    fontFamily: 'Montserrat_600SemiBold',
    color: '#FF0F5E',
    width: '11ch',
    textAlign: 'center',
    fontSize: 16
  },
  ceTextActive: {
    fontFamily: 'Montserrat_800ExtraBold',
    color: '#CA0747',
    borderBottomColor: '#CA0747',
    borderBottomWidth: 2,
    width: '11ch',
    textAlign: 'center',
    fontSize: 16
  },
  loginButton: {
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 30,
    paddingVertical: 15,
    position: 'relative',
    bottom: '-10%'
  }
})