import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import * as navigation from 'react-navigation'
import Footer from "../Footer"
import Header from "../Header"
import NextButton from "../NextButton"
import { useFonts } from "expo-font"
import { WorkSans_300Light } from "@expo-google-fonts/work-sans"
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat"


const SignIn_2 = () => {

  useFonts({
    WorkSans_300Light,
    Montserrat_700Bold
  })

  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/info-empresa.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Informações
          da Empresa
        </Text>
        <View style={styles.inputs}>
          <TextInput 
            placeholder={'Nome da Empresa'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'CNPJ'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'Descrição'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'Endereço'}
            style={styles.input}
          />
        </View>
        <View style={{width: '90%'}}>
          <NextButton _onPress={() => {}}/>                                                                                                                                                                                                           
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
    maxWidth: 100,
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