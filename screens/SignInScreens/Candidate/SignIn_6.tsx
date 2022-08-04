import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import Footer from "../Footer"
import Header from "../Header"
import NextButton from "../NextButton"
import { useFonts } from "expo-font"
import { WorkSans_300Light, WorkSans_600SemiBold } from "@expo-google-fonts/work-sans"
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat"


const SignIn_6 = () => {

  useFonts({
    WorkSans_300Light,
    WorkSans_600SemiBold,
    Montserrat_700Bold
  })

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

        <View style={styles.inputs}>
          <Text style={styles.subTitle}>
            Instituição de ensino
          </Text>
          <TextInput 
            placeholder={'Ex: ETEC'}
            style={styles.input}
          />
          <Text style={styles.subTitle}>
            Instituição de ensino
          </Text>
          <TextInput 
            placeholder={'Ex: Ensino Médio'}
            style={styles.input}
          />
          <Text style={styles.subTitle}>
            Instituição de ensino
          </Text>
          <TextInput 
            placeholder={'Ex: Informática'}
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
    width: '9ch',
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