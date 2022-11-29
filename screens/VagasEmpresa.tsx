import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import { auth } from '../config/firebase'
import { getData } from '../hooks/useAsyncStorage'
import { Empresa } from '../types'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import { Delete, Unlock } from 'react-native-iconly'
import { useNavigation } from '@react-navigation/native'

const VagasEmpresa = () => {

  const [userData, setUserData] = useState<Empresa>()
  const [photo, setPhoto] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigation = useNavigation()

  const getUserData = async () => {
    try {
      const data = await getData('user_data')
      if(typeof data == 'string') {
        const dataJson = JSON.parse(data)
        setUserData(dataJson)
        setIsLoading(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getUserData()
    if(auth.currentUser?.photoURL) setPhoto(auth.currentUser.photoURL)
  }, [])

  if(!isLoading && userData) return (
    <View style={styles.content}>
      <Header />
      <View style={styles.main}>
        <View style={styles.section1}>
          <Text style={styles.title}>Empresa</Text>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', alignSelf: 'center'}}>
            <Image source={{uri: photo}} style={styles.image}/>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 20, lineHeight: 25, minWidth: '65%'}}>{userData.dados_empresariais.nome}</Text>
              <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 15, color: '#7C7C7C'}}>{userData.dados_empresariais.setor}</Text>
            </View>
            <FontAwesome5 name="angle-right" size={24} color="#7C7C7C" />
          </TouchableOpacity>
        </View>
        <View style={styles.section2}>
          <Text style={styles.title}>Vagas</Text>
          <View style={{justifyContent: 'space-around', flex: 1}}>
            <TouchableOpacity 
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', alignSelf: 'center'}} 
              // @ts-ignore
              onPress={() => {navigation.navigate('Criar')}}
            >
              <View style={[styles.icon, {backgroundColor: 'rgba(143, 0, 255, .15)'}]}>
                <Entypo name="plus" size={24} color="#8F00FF" />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 20, lineHeight: 25, minWidth: '65%'}}>Criar</Text>
              </View>
              <FontAwesome5 name="angle-right" size={24} color="#7C7C7C" />
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', alignSelf: 'center'}}>
              <View style={[styles.icon, {backgroundColor: 'rgba(0, 26, 255, .15)'}]}>
                <Delete set="bold" primaryColor="#001AFF"/>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 20, lineHeight: 25, minWidth: '65%'}}>Excluir</Text>
              </View>
              <FontAwesome5 name="angle-right" size={24} color="#7C7C7C" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section2}>
          <Text style={styles.title}>Criadas</Text>
          <View style={{justifyContent: 'space-around', flex: 1}}>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', alignSelf: 'center'}}>
              <View style={[styles.icon, {backgroundColor: 'rgba(0, 128, 255, .15)'}]}>
                <Unlock set="bold" primaryColor="#0080FF"/>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 20, lineHeight: 25, minWidth: '65%'}}>Em aberto</Text>
              </View>
              <FontAwesome5 name="angle-right" size={24} color="#7C7C7C" />
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', alignSelf: 'center'}}>
              <View style={[styles.icon, {backgroundColor: 'rgba(65, 188, 70, .15)'}]}>
                <Entypo name="check" size={24} color="#41BC46" />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 20, lineHeight: 25, minWidth: '65%'}}>Finalizadas</Text>
              </View>
              <FontAwesome5 name="angle-right" size={24} color="#7C7C7C" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
  else return (
    <Text>Loading...</Text>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 26.5
  },
  image: {
    aspectRatio: 1 / 1,
    width: 64
  },
  main: {
    padding: 20,
    height: '80%',
    justifyContent: 'space-between'
  },
  section1: {
    width: '100%',
    flex: .5
  },
  section2: {
    width: '100%',
    flex: .8
  },
  icon: {
    aspectRatio: 1 / 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 40,
    
  }
})

export default VagasEmpresa