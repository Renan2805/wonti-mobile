import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import { useEffect, useState } from "react"
import { getData } from "../../../hooks/useAsyncStorage"
import { storage } from "../../../config/firebase"


const SignIn_9 = () => {

  const [teste, setTeste] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    const data = await getData('uid')
    // @ts-ignore
    setTeste(data)
    setIsLoading(false)
  }

  console.log(teste)
  
  if(!isLoading)
  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        { 
          <>
          {/* @ts-ignore */}
          <Text>{teste}</Text>
          </>
        }
        {/* <Image 
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
        <Footer /> */}
      </View>
    </View>
  )
  else return (
    <Text>Loading...</Text>
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