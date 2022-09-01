import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"

const SignIn_5 = () => {

  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/casa.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Endereço
        </Text>
        <View style={styles.inputs}>
          <TextInput 
            placeholder={'Rua'}
            style={styles.input}
          />
          <View style={styles.inputsHorizontal}>
            <TextInput 
              placeholder={'Nº'}
              style={styles.input}
            />
            <TextInput 
              placeholder={'Complemento'}
              style={styles.input}
            />
          
          </View>
          <TextInput 
            placeholder={'Bairro'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'CEP'}
            style={styles.input}
          />
          <View style={styles.inputsHorizontal}>
            <TextInput 
              placeholder={'Cidade'}
              style={styles.input}
            />
            <TextInput 
              placeholder={'UF'}
              style={styles.input}
            />
          
          </View>
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
    width: '8ch',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24
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

export default SignIn_5