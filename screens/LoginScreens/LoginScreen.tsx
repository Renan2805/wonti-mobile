import { useState } from 'react'
import { View, KeyboardAvoidingView, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { isLoaded } from 'expo-font';

type Props = NativeStackScreenProps<RootStackParamList>

function LoginScreen({navigation}: Props) {

  const [active, setActive] = useState(true)

  
  console.log(isLoaded('WorkSans_300Light'));

  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingVertical: 0, margin: 0}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name={'arrow-left'} size={45}/>
        </TouchableOpacity>
        <Image 
          source={require('../../assets/images/logoWonti.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/login-screen.png')}
          style={styles.image}
        />
      </View>
      <KeyboardAvoidingView style={styles.pinkContainer}>
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
          <Spacer height={40}/>
          <TextInput placeholder={active ? 'CPF' : 'CNPJ' } style={styles.input}/>
          <Spacer height={10}/>
          <TextInput placeholder='Senha' style={styles.input}/>
          <Text style={{textAlign: 'right', fontFamily: 'WorkSans_400Regular', fontSize: 15}}>Esqueceu a senha?</Text>
          <TouchableOpacity style={styles.loginButton}>
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
        <Text style={{fontFamily: 'WorkSans_600SemiBold', fontSize: 17, textAlign: 'center', color: '#CA0747'}}>Cadastre-se</Text>
      </KeyboardAvoidingView>
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


const styles = StyleSheet.create({
  container: {
    width: '100%',
    Height: '100%',
    flex: 1
  },
  header: {
    width: '100%',
    height: '10%',
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 34
  },
  imageContainer: {
    width: '100%',
    height: '30%',
    alignItems: 'center'
  },
  image: {
    maxWidth: '60%',
    maxHeight: '100%'
  },
  pinkContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: '#FFEEF5',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingTop: 40,
    paddingHorizontal: 25
  },
  loginContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderRadius: 25,
    backgroundColor: 'white',
    borderColor: '#ff035626',
    borderWidth: 1
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#848484',
    borderRadius: 30,
    padding: 15,
  },
  ce: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ceText: {
    fontFamily: 'monospace',
    color: '#FF0F5E',
    width: 88,
    textAlign: 'center',
    fontSize: 16
  },
  ceTextActive: {
    fontFamily: 'monospace',
    color: '#CA0747',
    borderBottomColor: '#CA0747',
    borderBottomWidth: 2,
    width: 120,
    textAlign: 'center',
    fontSize: 16
  },
  loginButton: {
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 30,
    paddingVertical: 15,
    position: 'relative',
    bottom: '-10%'
  }
})