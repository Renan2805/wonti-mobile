import React, { useEffect, useState } from 'react'
import { ScrollView, View ,Text, StyleSheet, StatusBar, Image,SafeAreaView, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import CardRecommended from '../components/CardRecommended/CardRecommended'
import SearchBar from '../components/SearchBar/SearchBar'
import { RootTabScreenProps } from '../types'
import { getData } from '../hooks/useAsyncStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../config/firebase'
import { updateProfile,  } from '@firebase/auth'
import Loader from '../components/Loader/Loader'
import Carousel from 'react-native-snap-carousel'

const HomeScreen = ({ navigation, route }: RootTabScreenProps<'Home'>) => {

  {/*const itemSlide = [
    {
      title: 'Dev. Front End'
    },
    {    
    image: 'https://logopng.com.br/logos/google-37.png'
    },
    {
    description: 'A Dev. Front End será responsável por desenvolver produtos e serviços.'
    },
    {
    hirer:'Google'
    },
    {
    theme:true
    },
    {
    time:'Integral'
    },
    {
    type:'Remoto'
    },
    {
    salary:2000
    },
    {
    competitors:20
    },
    {
    place:'São Paulo, SP'
    },
    {
    posted:2
    },
    {
    full:true
    }
  ] */}
  
  const [user, setUser] = useState(auth.currentUser)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if(user === null) {
      setIsLoading(true)
    }else {
      setIsLoading(false)
    }

    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
    })
  }, [])
  if(!isLoading)
  return (
    <SafeAreaView style={style.safeView}>
      <View style={style.content}>
        <View style={style.navbar}>
          <View style={style.viewLogo}>
            <Image source={require('../assets/images/logoWonti.png')}
            style={{width:75, height:23}}
            />
          </View>
          <View style={style.viewFoto}>
            <TouchableOpacity style={{width:75,borderRadius:100}} onPress={() => {navigation.navigate('Config')}}>
             <Image source={require('../assets/images/vh.jpg')}
              style={{width:75, height:75, borderRadius:100}}
              />
            </TouchableOpacity>
          </View>
        </View>
          <View style={{width: '100%', alignItems: 'center', marginTop:10}}>
            <SearchBar />
          </View>
          <View style={style.viewCarrosel}>
            <View style={style.recomendados}>
              <Text style={{fontSize:25, fontWeight:'bold', textAlign:'left', width:'80%'}}>Recomendado</Text>
              <TouchableOpacity>
                <Text style={{textAlign:'right',fontSize:20}}>Ver todas</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
      </SafeAreaView>
  )
  else return (
    <Loader />
  )
}

const style = StyleSheet.create({
  safeView :{
    paddingTop: StatusBar.currentHeight,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  content: {
    flex:1,
    width: '100%',
    alignItems: 'center'
  },
  navbar: {
    width:'100%',
    height:100,
    display:'flex',
    flexDirection:'row',
    padding:10
  },
  viewCarrosel: {
    display:'flex',
    width:'100%',
    flexDirection:'column',
    padding:20,
    marginTop:20
  },
  recomendados: {
    flexDirection:'row'
  },
  viewLogo: {
    marginTop:25,
    width:'80%',
    textAlign:'left'
  },
  viewFoto: {
    width:'30%',
    textAlign:'right'
  },
  
})

export default HomeScreen