import React, { useState } from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { IoIosArrowDown } from 'react-icons/io'
import { useFonts } from 'expo-font'
import { WorkSans_300Light } from '@expo-google-fonts/work-sans'
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import Header from '../Header'
import NextButton from '../NextButton'
import Footer from '../Footer'

const SignIn_3 = () => {
  useFonts({
    Montserrat_700Bold,
    WorkSans_300Light
  })

  const getCurrentDate=()=>{

    var date = new Date().getDate()
    var month = new Date().getMonth()
    var year = new Date().getFullYear()

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '/' + month + '/' + year//format: dd-mm-yyyy;
}
  

  const [date, setDate] = useState(getCurrentDate())
  const [open, setOpen] = useState(false)


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
                date
              }              
            </Text>
            <TouchableOpacity
              onPress={() => {
                setOpen(!open)
                alert(open)
              }}
            >
              <IoIosArrowDown />
            </TouchableOpacity>
            {/* <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            /> */} 
          </View>
          <TextInput 
            placeholder={'Cidade De Nascimento'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'UF'}
            style={styles.input}
          />
          <TextInput 
            placeholder={'CPF'}
            style={styles.input}
          />
        </View>
        <View style={{width: '90%'}}>
          <NextButton />
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
    width: '8ch',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24
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