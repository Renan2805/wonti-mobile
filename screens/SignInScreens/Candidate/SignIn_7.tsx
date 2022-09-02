import { StyleSheet, View, Text, Image, TextInput } from "react-native"
import SelectDropDown from 'react-native-select-dropdown'
import Footer from "../Footer"
import Header from "../../../components/Header"
import NextButton from "../NextButton"
import { RootStackScreenProps } from "../../../types"
import { useState } from "react"


const SignIn_7 = ({navigation, route}: RootStackScreenProps<'SignIn_7c'>) => {
  
  const [mesInicio, setMesInicio] = useState('')
  const [mesTermino, setMesTermino] = useState('')

  const [anoInicio, setAnoInicio] = useState('')
  const [anoTermino, setAnoTermino] = useState('')

  const [inicio, setInicio] = useState('')
  const [termino, setTermino] = useState('')

  const goNext = () => {
    setInicio(mesInicio + '/' + anoInicio)
    setTermino(mesTermino + '/' + anoTermino)

    navigation.navigate('SignIn_8c', {
      instituicao: route.params.instituicao,
      nivel: route.params.nivel,
      qualificacao: route.params.qualificacao,
      dataInicio: inicio,
      dataTermino: termino
    })
  }

  const listaMes = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ]

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
          <Text style={styles.subTitle}>
            Data de Início
          </Text>
          <View style={styles.inputsHorizontal}>
            <SelectDropDown
              data={listaMes}
              rowTextForSelection={(item) => item}
              defaultButtonText={'Mês'}
              buttonTextAfterSelection={(item) => item}
              onSelect={item => setMesInicio(item)}
              buttonStyle={{maxWidth: '30%', borderWidth: 1, borderRadius: 30, borderColor: '#848484'}}
              buttonTextStyle={{width: '100%', fontFamily: 'WorkSans_300Light', fontSize: 16, color: '#848484'}}
              dropdownStyle={{borderRadius: 30}}
            />
            <TextInput 
              placeholder={'Ano'}
              style={[styles.input, {maxWidth: '65%'}]}
              onChangeText={text => setAnoInicio(text)}
            />
          </View>
          <Text style={styles.subTitle}>
            {'Data de Término (ou previsão)'}
          </Text>
          <View style={styles.inputsHorizontal}>
            <SelectDropDown
                data={listaMes}
                rowTextForSelection={(item) => item}
                defaultButtonText={'Mês'}
                buttonTextAfterSelection={(item) => item}
                onSelect={item => setMesTermino(item)}
                buttonStyle={{maxWidth: '30%', borderWidth: 1, borderRadius: 30, borderColor: '#848484'}}
                buttonTextStyle={{width: '100%', fontFamily: 'WorkSans_300Light', fontSize: 16, color: '#848484'}}
                dropdownStyle={{borderRadius: 30}}
              />
              <TextInput 
                placeholder={'Ano'}
                style={[styles.input, {maxWidth: '65%'}]}
                onChangeText={text => setAnoTermino(text)}
              />
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
    justifyContent: 'space-between',
    width: '100%'
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

export default SignIn_7