import { useState } from 'react'
import { StyleSheet, View, Text, Image, TextInput, Alert } from "react-native"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import { RootStackScreenProps } from "../../../types"
import { getData, storeData } from "../../../hooks/useAsyncStorage"
import { AntDesign } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../../config/firebase'

const SignIn_8 = ({navigation, route}: RootStackScreenProps<'SignIn_8c'>) => {

  type Formacao = {
    instituicao: string,
    nivel: string,
    qualificacao: string,
    dataInicio: string,
    dataTermino: string,
    idiomas: string[],
    certificados: string[],
    aptidoes: string[]
  }

  const [idiomas, setIdiomas] = useState([])
  const [idioma, setIdioma] = useState('')

  const [certificados, setCertificados] = useState([])
  const [certificado, setCertificado] = useState('')

  const [aptidoes, setAptidoes] = useState([])
  const [aptidao, setAptidao] = useState('')

  const goNext = () => {
    const formacao: Formacao = {
      instituicao: route.params.instituicao,
      nivel: route.params.nivel,
      qualificacao: route.params.qualificacao,
      dataInicio: route.params.dataInicio,
      dataTermino: route.params.dataTermino,
      idiomas: idiomas,
      certificados: certificados,
      aptidoes: aptidoes
    }
    const formacaoStr = JSON.stringify(formacao)

    storeData('formacao', formacaoStr)

    navigation.navigate('SignIn_9c')
  }

  const validate = (array: string[], value: string) => {
    if(array.length < 3) {
     if(value) array.push(value) 
     else Alert.alert('Insira um texto válido') 

    } else Alert.alert('Maximo de 3 itens')
    
  }

  const validateSignIn = async () => {
    const email = await getData('email')
    // @ts-ignore
    const password = await getData('password')
    // @ts-ignore
    const endereco = await JSON.parse(await getData('endereco'))
    // @ts-ignore
    const dados = JSON.parse(await getData('dadosPessoais'))
    
    const formacao: Formacao = {
      instituicao: route.params.instituicao,
      nivel: route.params.nivel,
      qualificacao: route.params.qualificacao,
      dataInicio: route.params.dataInicio,
      dataTermino: route.params.dataTermino,
      idiomas: idiomas,
      certificados: certificados,
      aptidoes: aptidoes
    }
    
    if(endereco|| dados) {
      // @ts-ignore
      const usuario = {
        email: email,
        endereco: endereco,
        dados_pessoais: dados,
        formacao: formacao
      }
      console.log(usuario)

      // @ts-ignore
      await createUserWithEmailAndPassword(auth, usuario.email, password).then(async (userCredential) => {
        updateProfile(userCredential.user, {
          displayName: usuario.dados_pessoais.nome + ' ' + usuario.dados_pessoais.sobrenome
        })
        const dc = doc(db, 'Users', userCredential.user.uid)
        await setDoc(dc, usuario)
      })
      .catch(e => console.log(e))

    }

  }

  const addTo = (key: string, value: string) => {
    
    switch (key) {
      case 'idioma':
        validate(idiomas, value)
        setIdioma('')
        break
      case 'certificado':
        validate(certificados, value)
        setCertificado('')
        break
      case 'aptidao':
        validate(aptidoes, value)
        setAptidao('')
        break
      default:
        break
    }
  }


  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/formacao.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Formação{'\n'}
          Academica
        </Text>

        <View style={styles.inputs}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.subTitle}>
              Idiomas
            </Text>
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10}}>
                {
                  idiomas.map((idioma, index) => (
                    <Text key={index} style={styles.listItem}>{idioma}</Text>
                  ))
                }
                <Text style={[styles.listItem, { backgroundColor: 'transparent'}]}>{''}</Text>
              </View>
            <View style={styles.inputPlusWrapper}>
              <TextInput 
                placeholder={'Ex: Português - BR'}
                style={styles.input}
                onChangeText={text => setIdioma(text)}
                value={idioma}
              /> 
              <AntDesign name="plus" size={24} color="black" onPress={() => addTo('idioma', idioma)}/>         
            </View>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.subTitle}>
              Certificados
            </Text>
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10}}>
              {
                certificados.map((certificado, index) => (
                  <Text key={index} style={styles.listItem}>{certificado}</Text>
                ))
              }
              <Text style={[styles.listItem, { backgroundColor: 'transparent'}]}>{''}</Text>
            </View>
            <View style={styles.inputPlusWrapper}>
              <TextInput 
                placeholder={'Ex: LPI Linux Essentials'}
                style={styles.input}
                onChangeText={text => setCertificado(text)}
                value={certificado}
              /> 
              <AntDesign name="plus" size={24} color="black" onPress={() => addTo('certificado', certificado)}/>         
            </View>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.subTitle}>
              Aptidões
            </Text>
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10}}>
              {
                aptidoes.map((aptidao, index) => (
                  <Text key={index} style={styles.listItem}>{aptidao}</Text>
                ))
              }
              <Text style={[styles.listItem, { backgroundColor: 'transparent'}]}>{''}</Text>
            </View>
            <View style={styles.inputPlusWrapper}>
              <TextInput 
                placeholder={'Ex: Criatividade'}
                style={styles.input}
                onChangeText={text => setAptidao(text)}
                value={aptidao}
              /> 
              <AntDesign name="plus" size={24} color="black" onPress={() => addTo('aptidao', aptidao)}/>         
            </View>
          </View>
        </View>
        <View style={{width: '90%'}}>
          <NextButton _onPress={() => validateSignIn()}/>
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
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24
  },
  sectionWrapper: {
    maxHeight: 60
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
    maxHeight: '50%',
    flexGrow: 50
  },
  inputsHorizontal: {
    flexDirection: 'row',
    gap: 10
  },
  inputPlusWrapper: {
    borderWidth: 1, 
    borderRadius: 30, 
    width: '100%', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    flex: 0, 
    justifyContent: 'space-between', 
    flexDirection: 'row'
  },
  input: {
    padding: 0,
    margin: 0,
    maxWidth: '90%',
    minWidth: '80%',
    fontFamily: 'WorkSans_300Light',
    fontSize: 18,
    color: '#848484',
  },
  listItem: {
    backgroundColor: '#E3175A',
    paddingHorizontal: 5,
    borderRadius: 3,
    color: 'white',
    fontFamily: 'WorkSans_300Light',
    marginHorizontal: 5,
  }
})

export default SignIn_8