import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import { useEffect, useState } from "react"
import { getData, getMultipleData } from "../../../hooks/useAsyncStorage"
import { auth, db, storage } from "../../../config/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth"
import { RootStackScreenProps } from "../../../types"
import { User } from "react-native-iconly"
import { doc, setDoc } from "firebase/firestore"


const Finalizar = ({navigation}: RootStackScreenProps<'finalizar'>) => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const validateSignIn = async () => {
    const email = await getData('email')
    // @ts-ignore
    const password = await getData('password')
    // @ts-ignore
    const endereco = await JSON.parse(await getData('endereco'))
    // @ts-ignore
    const dados = JSON.parse(await getData('dadosEmpresa'))
    // @ts-ignore
    const contato = JSON.parse(await getData('contato'))
    
    if(endereco|| dados) {
      // @ts-ignore
      const empresa = {
        email: email,
        endereco: endereco,
        contato:contato,
        dados: dados
      }
      console.log(empresa)

      // @ts-ignore
      await createUserWithEmailAndPassword(auth, empresa.email, password).then(async (userCredential) => {
        updateProfile(userCredential.user, {
          displayName: empresa.dados.nome + ' ' + empresa.dados.sobrenome
        })
        const dc = doc(db, 'Empresa', userCredential.user.uid)
        await setDoc(dc, empresa)
      })
      .catch(e => console.log(e))

    }
    navigation.navigate('LoginScreen')
  }
  
  useEffect(() => {
    
  }, [])

  if(!isLoading)
  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/empresa_finalizar.png')}
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
          Você finalizou seu cadastro e faz parte da WonTI, agora faça login e tenha acesso aos currículos disponiveis na plataforma.
        </Text>

        <View style={{width: '90%'}}>
          <NextButton _onPress={() => validateSignIn()}/>
          <Text>{error.toString()}</Text>
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

export default Finalizar