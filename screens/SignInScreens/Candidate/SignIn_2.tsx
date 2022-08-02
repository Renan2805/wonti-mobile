import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import Footer from "../Footer"
import Header from "../Header"
import NextButton from "../NextButton"
import { useFonts } from "expo-font"
import { WorkSans_300Light } from "@expo-google-fonts/work-sans"


const SignIn_2 = () => {

  useFonts({
    WorkSans_300Light
  })

  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/perfil.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Dados Pessoais
        </Text>
        <View style={styles.inputs}>
          <TextInput 
            placeholder={'Nome'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'Sobrenome'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'RG'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'CPF'}
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
    width: '8ch'
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