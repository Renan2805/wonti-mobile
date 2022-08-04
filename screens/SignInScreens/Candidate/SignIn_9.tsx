import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import Footer from "../Footer"
import Header from "../Header"
import NextButton from "../NextButton"


const SignIn_9 = () => {

  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/done.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Parabéns
        </Text>

        <Text
          style={{
            fontFamily: 'Montserrat_400Regular',
            fontSize: 21,
            textAlign: 'center',
            maxWidth: '25ch'
          }}
        >
          Você finalizou seu cadastro e faz parte da WonTI, agora faça login e tenha acesso às vagas disponiveis na plataforma.
        </Text>

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
    height: 290,
    width: 290
  },
  title: {
    width: '100',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 28,
    color: '#CA0747'
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

export default SignIn_9