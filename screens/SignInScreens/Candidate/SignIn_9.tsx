import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import { useEffect, useState } from "react"
import { getData, getMultipleData } from "../../../hooks/useAsyncStorage"
import { auth, storage } from "../../../config/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth"
import { RootStackScreenProps } from "../../../types"
import { User } from "react-native-iconly"


const SignIn_9 = ({navigation}: RootStackScreenProps<'SignIn_9c'>) => {

  const [dados, setDados] = useState({
    email: '',
    password: '',
    dadosPessoais: {
      nome: '',
      sobrenome: ''
    },
    contato: {},
    endereco: {},
    formacao: {}
  })
  const [isLoading, setIsLoading] = useState(true)

  
  const fetchData = async () => {
    setIsLoading(true)
    
    const email = await getData('email')
    const senha = await getData('password')
    const dadosPessoais = await getData('dadosPessoais')
    const contato = await getData('contato')
    const endereco = await getData('endereco')
    const formacao = await getData('formacao')

    const data = {
      email: email,
      password: senha,
      // @ts-ignore
      dadosPessoais: JSON.parse(dadosPessoais),
      // @ts-ignore
      contato: JSON.parse(contato),
      // @ts-ignore
      endereco: JSON.parse(endereco),
      // @ts-ignore
      formacao: JSON.parse(formacao)
    }

    // @ts-ignore
    setDados(data)

  }

  const doSignUp = () => {
    createUserWithEmailAndPassword(auth, dados.email, dados.password).then(userCredential => {
      setIsLoading(true)
      const user = userCredential.user
      updateProfile(user, {
        displayName: dados.dadosPessoais.nome + ' ' + dados.dadosPessoais.sobrenome
      })
    })
  }
  
  useEffect(() => {
    fetchData().then(() => setIsLoading(false)).catch(e => console.log(e))
  }, [])

  if(!isLoading)
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
            maxWidth: 250
          }}
        >
          Você finalizou seu cadastro e faz parte da WonTI, agora faça login e tenha acesso às vagas disponiveis na plataforma.
        </Text>

        <View style={{width: '90%'}}>
          <NextButton _onPress={() => doSignUp()}/>
        </View>
        <Footer />
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
    width: 120,
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