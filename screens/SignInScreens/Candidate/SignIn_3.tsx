import React, { SetStateAction, useState, useEffect } from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import SelectDropDown from 'react-native-select-dropdown'
import Header from '../../../components/Header'
import NextButton from '../NextButton'
import Footer from '../Footer'
import { RootStackScreenProps } from '../../../types';
import { storeData } from '../../../hooks/useAsyncStorage';

const SignIn_3 = ({navigation, route}: RootStackScreenProps<'SignIn_3c'>) => {

  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

  const listaUf = [
    'AC', 'AL', 'AP',
    'AM', 'BA', 'CE',
    'DF', 'ES', 'GO',
    'MA', 'MT', 'MS',
    'MG', 'PA', 'PB',
    'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS',
    'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ]

  const onChange = (event: DateTimePickerEvent, selectedDate: SetStateAction<Date>) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  };

  const goNext = () => {
    storeData('cidade', cidade)
    storeData('uf', uf)
    storeData('data-nascimento', date.toString())
    navigation.navigate('SignIn_4c')
  }

  return (
    <View style={{height: '100%'}}>
      <Header/>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/perfil.png')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Dados Pessoais
        </Text>
        <View style={styles.inputs}>
          <View
            style={[styles.input, {
              flexDirection: 'row',
              justifyContent: 'space-between'
            }]}
          >
            <Text style={{
              fontFamily: 'WorkSans_300Light',
              fontSize: 18,
              color: '#848484',
            }}>
              {
                date.toLocaleDateString()
              }              
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShow(!show)
              }}
            >
              <Ionicons name="ios-arrow-down" size={24} color="black" />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                // @ts-ignore
                onChange={(event, date) => onChange(event, date)}
              />
            )}
          </View>
          <TextInput 
            placeholder={'Cidade De Nascimento'}
            style={styles.input}
            onChangeText={text => setCidade(text)}
          />
          <SelectDropDown
            data={listaUf}
            rowTextForSelection={(item) => item}
            defaultButtonText={'UF'}
            buttonTextAfterSelection={(item) => item}
            onSelect={item => setUf(item)}
            buttonStyle={{width: '100%', borderWidth: 1, borderRadius: 30, borderColor: '#848484'}}
            buttonTextStyle={{width: '100%', fontFamily: 'WorkSans_300Light', fontSize: 18, color: '#848484'}}
            dropdownStyle={{borderRadius: 30, }}
          />
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
    width: '30%',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
  },
  inputs: {
    width: '100%',
    flex: 1,
    justifyContent:'space-around',
    maxHeight: '40%'
  },
  input: {
    fontFamily: 'WorkSans_300Light',
    fontSize: 18,
    color: '#848484',

    borderWidth: 1,
    borderColor: '#848484',
    borderRadius: 30,

    paddingVertical: 14,
    paddingHorizontal: 17,
    width: '100%'
  }
})

export default SignIn_3