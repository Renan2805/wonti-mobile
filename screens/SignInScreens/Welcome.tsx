import React from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { WorkSans_400Regular, WorkSans_600SemiBold } from '@expo-google-fonts/work-sans'

const Welcome = () => {

  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    WorkSans_400Regular,
    WorkSans_600SemiBold
  })

  if(fontsLoaded) return (
    <View style={styles.container}>
      
      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/images/welcome-page-img.png')}
            style={styles.image}
          />
        </View>
        <Text style={{fontFamily: 'Montserrat_700Bold', fontSize: 28, textAlign: 'center', marginHorizontal: 'auto', width: '11ch'}}>Bem-vindo a WonTI</Text>
        
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'black' }]}
          >
            <Text style={styles.buttonText}>Candidatas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#414141' }]}
          >
            <Text style={styles.buttonText}>Candidatas</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{fontFamily: 'WorkSans_400Regular', fontSize: 17, textAlign: 'center', width: '16ch'}}
        >
        Já possui conta? Faça
          <Text style={{fontFamily: 'WorkSans_600SemiBold', color: '#CA0747'}}> login</Text>
        </Text>
      </View>
    </View>
  )
  else return (
    <Text>Carregando</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  imageContainer: {
    width: '100%',
    height: '40%',
    paddingHorizontal: 50
  },
  image: {
    aspectRatio: 1 / 1,
    width: '100%'
  },
  body: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  buttons: {
    width: '80%',
    maxHeight: 120,
    flex: 1,
    justifyContent: 'space-between'
  },
  button: {
    width: '100%',
    height: 55,
    borderRadius: 30,
    paddingVertical: 12
  },
  buttonText: {
    fontFamily: 'WorkSans_400Regular',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  }
})


export default Welcome