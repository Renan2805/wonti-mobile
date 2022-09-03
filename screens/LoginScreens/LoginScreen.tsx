import { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, StatusBar, KeyboardAvoidingView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types'
import Header from '../../components/Header'
import { auth, storage } from '../../config/firebase'
import { signInWithEmailAndPassword, UserCredential, AuthError, signOut } from 'firebase/auth'
import { storeData } from '../../hooks/useAsyncStorage'

type Props = NativeStackScreenProps<RootStackParamList>

function LoginScreen({navigation}: Props) {

  const [active, setActive]       = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  
  const [error, setError]       = useState('')

  const handleError = (err: AuthError) => {
    switch(err.code) {
      case 'auth/invalid-email':
        setError('Email Invalido')
        break
      case 'auth/wrong-password':
        setError('Senha Incorreta')
        break
      case 'auth/too-many-requests':
        setError('Muitas tentativas, tente novamente mais tarde')
        break
      case 'auth/internal-error':
        setError('Erro Interno, tente novamente mais tarde')
        break
      default:
        setError(err.code)
        break
    }

    console.log(err)
    
  }

  const loginFirebase = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
      return userCredential.user.uid
    })
    .catch((err: AuthError) => handleError(err))
  }
  
  const doLogin = () => {
    const userUid = loginFirebase()
    if(email !== '' && password !== '') {

      // @ts-ignore
      storeData('uid', userUid)
      // @ts-ignore
      navigation.navigate('App')
    }
  }

  useEffect(() => {
    signOut(auth)
      .then(() => {
        setIsLoading(false)
      })
      .catch(e => setError(e))
  }, [])

  if(!isLoading) return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <View style={{flex: 3}}>
        <Header />
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/login-screen.png')} style={styles.image}/>
        </View>
      </View>
      <View style={styles.pinkContainer}>
        <View style={styles.loginContainer}>
          <View style={styles.ce}>
            <Text style={active ? styles.ceTextActive : styles.ceText} onPress={() => setActive(true)}>Candidata</Text>
            <Text style={!active ? styles.ceTextActive : styles.ceText} onPress={() => setActive(false)}>Empresa</Text>
          </View>
          {
            error != ''
            ?
            <Text style={styles.erro}>{error}</Text>
            :
            <></>
          }
          <View style={styles.inputs}>
            <TextInput 
              style={styles.input}
              placeholder={'Email'}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType={'email-address'}

              />
            <TextInput 
              style={styles.input}
              placeholder={'Senha'}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          {/* @ts-ignore */}
          <Text style={{fontFamily: 'WorkSans_400Regular', fontSize: 15, textAlign: 'right', marginVertical: 5}} onPress={() => navigation.navigate('passwordRecover')}>Esqueceu a senha?</Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => doLogin()}>
            <Text style={{fontFamily: 'WorkSans_500Medium', fontSize: 23, color: 'white', textAlign: 'center'}}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontFamily: 'WorkSans_400Regular', fontSize: 17, textAlign: 'center', maxWidth: '100%', flex: 0}}>
          Não possui cadastro?{'\n'}
          <Text style={{fontFamily: 'WorkSans_600SemiBold', color: '#CA0747'}} onPress={() => navigation.navigate('SignIn_1', {isUser: active})}> Cadastre-se</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
  else return (
    <Text>Loading...</Text>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight
  },
  logo: {
    width: 110,
    height: 34
  },
  imageContainer: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    aspectRatio: 1 / 1
  },
  erro: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'WorkSans_700Bold',
    color: 'red'
  },
  pinkContainer: {
    width: '100%',
    backgroundColor: '#FFEEF5',
    flex: 3,
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  loginContainer: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 25,
    backgroundColor: 'white',
    borderColor: '#ff035626',
    borderWidth: 1,
  },
  inputs: {
    flex: 0,
    maxHeight: '50%',
    minHeight: '30%',
    justifyContent: 'space-around',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#848484',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontFamily: 'WorkSans_300Light',
    fontSize: 18
  },
  ce: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
    marginBottom: 5,
  },
  ceText: {
    fontFamily: 'Montserrat_600SemiBold',
    color: '#FF0F5E',
    width: 120,
    textAlign: 'center',
    fontSize: 16,
  },
  ceTextActive: {
    fontFamily: 'Montserrat_800ExtraBold',
    color: '#CA0747',
    borderBottomColor: '#CA0747',
    borderBottomWidth: 2,
    width: 120,
    textAlign: 'center',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 40,
    paddingVertical: 15,
  }
})