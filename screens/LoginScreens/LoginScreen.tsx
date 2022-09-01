import { useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, StatusBar } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types'
import Header from '../../components/Header'

type Props = NativeStackScreenProps<RootStackParamList>

function LoginScreen({navigation}: Props) {

  const [active, setActive]     = useState(true)

  const [user, setUser]         = useState("pp")
  const [password, setPassword] = useState("uu")
  
  const [userValid, setUserValid]         = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const doLogin = () => {
  
    if(active) {
      if (validaCPF(user)) setUserValid(true)
      else alert('CPF Inválido')
    } else {

    }

    if (validaSenha(password)) setPasswordValid(true)
    else alert('Senha Inválida')

    if (userValid && passwordValid) {
      alert('tudo certo')
    }

  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header />
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/login-screen.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.pinkContainer}>
        <View style={styles.loginContainer}>
          <View style={styles.ce}>
            <TouchableOpacity onPress={() => setActive(true)}>
              <Text style={active ? styles.ceTextActive : styles.ceText}>
                Candidatas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive(false)}>
              <Text style={active ? styles.ceText : styles.ceTextActive}>
                Empresas
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput placeholder={active ? 'CPF' : 'CNPJ' } style={styles.input} onChangeText={(text) => setUser(text)}/>
          <Spacer height={10}/>
          <TextInput placeholder='Senha' style={styles.input} onChangeText={(text) => setPassword(text)}/>
          <Text style={{textAlign: 'right', fontFamily: 'WorkSans_400Regular', fontSize: 15, marginBottom: 10}}>Esqueceu a senha?</Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('App')}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 23,
                fontFamily: 'WorkSans_500Medium',
                textAlign: 'center'
              }}
            >
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontFamily: 'WorkSans_400Regular', fontSize: 17, textAlign: 'center', marginTop: 35}}>Não possui cadastro?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn_1', {isUser: active})}>
          <Text style={{fontFamily: 'WorkSans_600SemiBold', fontSize: 17, textAlign: 'center', color: '#CA0747'}}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

interface SpacerProps {
  height: number
}

const Spacer = ({ height }: SpacerProps) => {
  return (
    <View style={{height: height}}></View>
  )
}

function validaCPF(strCPF: string) {
  //Verifica se o CPF é o mesmo numero repetido 11 vezes 
  var intCPF: number = parseInt(strCPF),
      soma:   number = 0
  while(intCPF) {
    soma += intCPF % 10
    intCPF = Math.floor(intCPF / 10)
  }
  if(soma === parseInt(strCPF[0]) * 11) return false

  var Soma
  var Resto
  Soma = 0

  for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i)
  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11))  Resto = 0
  if (Resto != parseInt(strCPF.substring(9, 10)) ) return false

  Soma = 0
  for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)
  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11))  Resto = 0
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false
  return true
}

// function validaCNPJ (strCnpj: any) {
//   var b = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
//   var c = String(strCnpj).replace(/[^\d]/g, '')
  
//   if(c.length !== 14)
//       return false

//   if(/0{14}/.test(c))
//       return false

//   for (var i: any = 0, n = 0; i < 12; n += c[i] * b[++i]);
//   if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
//       return false

//   for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
//   if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
//       return false

//   return true
// }

function validaSenha(strSenha: string) {
  if (strSenha.length < 8 || strSenha.length > 12) return false
  else return true
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 110,
    height: 34
  },
  imageContainer: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '80%'
  },
  pinkContainer: {
    width: '100%',
    minHeight: '55%',
    backgroundColor: '#FFEEF5',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingTop: 40,
    paddingHorizontal: 25,
  },
  loginContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderRadius: 25,
    backgroundColor: 'white',
    borderColor: '#ff035626',
    borderWidth: 1,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#848484',
    borderRadius: 30,
    padding: 15,
    fontSize: 20
  },
  ce: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
    marginBottom: 5,
    minHeight: '11%'
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
    transform: [
      { translateY: 15}
    ]
  }
})