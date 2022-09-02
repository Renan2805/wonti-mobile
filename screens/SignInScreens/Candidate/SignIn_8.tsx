import { useState } from 'react'
import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import { RootStackScreenProps } from "../../../types"
import { storeData } from "../../../hooks/useAsyncStorage"
import { AntDesign } from '@expo/vector-icons';

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

  const addTo = (key: string, value: string) => {
    switch (key) {
      case 'idioma':
        // @ts-ignore
        setIdiomas(current => [...current, value])
        break
      case 'certificado':
         // @ts-ignore
        setCertificados(current => [...current, value])
        break
      case 'aptidao':
         // @ts-ignore
        setAptidoes(current => [...current, value])
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
          Formação Academica
          
        </Text>

        <View style={styles.inputs}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.subTitle}>
              Idiomas
            </Text>
            {
              idiomas ? 
              <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 15}}>
                {
                  idiomas.map((idioma, index) => (
                    <Text key={index} style={styles.listItem}>{idioma}</Text>
                  ))
                }
              </View> :
              <></>
            }
            <View style={styles.inputPlusWrapper}>
              <TextInput 
                placeholder={'Ex: Português - BR'}
                style={styles.input}
                onChangeText={text => setIdioma(text)}
              /> 
              <AntDesign name="plus" size={24} color="black" onPress={() => addTo('idioma', idioma)}/>         
            </View>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.subTitle}>
              Certificados
            </Text>
            {
              certificados ? 
              <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 15}}>
                {
                  certificados.map((certificado, index) => (
                    <Text key={index} style={styles.listItem}>{certificado}</Text>
                  ))
                }
              </View> :
              <></>
            }
            <View style={styles.inputPlusWrapper}>
              <TextInput 
                placeholder={'Ex: LPI Linux Essentials'}
                style={styles.input}
                onChangeText={text => setCertificado(text)}
              /> 
              <AntDesign name="plus" size={24} color="black" onPress={() => addTo('certificado', certificado)}/>         
            </View>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.subTitle}>
              Aptidões
            </Text>
            {
              aptidoes ? 
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 15}}>
                  {
                    aptidoes.map((aptidao, index) => (
                      <Text key={index} style={styles.listItem}>{aptidao}</Text>
                    ))
                  }
                </View> :
                <></>
            }
            <View style={styles.inputPlusWrapper}>
              <TextInput 
                placeholder={'Ex: Criatividade'}
                style={styles.input}
                onChangeText={text => setAptidao(text)}
              /> 
              <AntDesign name="plus" size={24} color="black" onPress={() => addTo('aptidao', aptidao)}/>         
            </View>
          </View>
        </View>
        <View style={{width: '90%'}}>
          <NextButton _onPress={() => goNext()}/>
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
    width: '35%',
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