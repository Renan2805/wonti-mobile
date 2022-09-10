import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, StatusBar, SafeAreaView, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import CardRecommended from '../components/CardRecommended/CardRecommended'
import SearchBar from '../components/SearchBar/SearchBar'
import { RootTabScreenProps } from '../types'
import { getData } from '../hooks/useAsyncStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../config/firebase'
import { updateProfile,  } from '@firebase/auth'
import Loader from '../components/Loader/Loader'
import { useLinkProps } from '@react-navigation/native'



type Props = NativeStackScreenProps<RootStackParamList>

const dados = {
  nome:'vitor'
}

const VagasScreen = ({ navigation }: Props) => {

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
      <View style={{flex:1, padding:20, alignItems:'center', marginBottom:30}}>
        <Text style={{fontSize:25, fontWeight:'bold'}}>Procurar vagas</Text>
      </View>
      <ExpoStatusBar.StatusBar translucent={true}/>
      <ScrollView contentContainerStyle={style.content} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true} >
      <View style={{width: '100%', alignItems: 'center'}}>
        <SearchBar />
      </View>
      {/*<Text>{user?.uid}</Text>*/}
      <CardRecommended 
        title={'Dev. Front End'}
        image={'https://logopng.com.br/logos/google-37.png'}
        description={'A Dev. Front End será responsável por desenvolver produtos e serviços.'}
        hirer={'Google'}
        theme={true}
        time={'Integral'}
        type={'Remoto'}
        salary={2000}
        competitors={20}
        place={'São Paulo, SP'}
        posted={2}
        full={true}
      />
      <CardRecommended 
        title={'Dev. Front End'}
        image={'https://logopng.com.br/logos/google-37.png'}
        description={'A Dev. Front End será responsável por desenvolver produtos e serviços.'}
        hirer={'Google'}
        theme={true}
        time={'Integral'}
        type={'Remoto'}
        salary={2000}
        competitors={20}
        place={'São Paulo, SP'}
        posted={2}
        full={true}
      />
      <CardRecommended 
        title={'Dev. Front End'}
        image={'https://logopng.com.br/logos/google-37.png'}
        description={'A Dev. Front End será responsável por desenvolver produtos e serviços.'}
        hirer={'Google'}
        theme={true}
        time={'Integral'}
        type={'Remoto'}
        salary={2000}
        competitors={20}
        place={'São Paulo, SP'}
        posted={2}
        full={true}
      />
      <CardRecommended 
        title={'Dev. Front End'}
        image={'https://logopng.com.br/logos/google-37.png'}
        description={'A Dev. Front End será responsável por desenvolver produtos e serviços.'}
        hirer={'Google'}
        theme={true}
        time={'Integral'}
        type={'Remoto'}
        salary={2000}
        competitors={20}
        place={'São Paulo, SP'}
        posted={2}
        full={true}
      />
      </ScrollView>
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
    width: '100%',
    alignItems: 'center'
  }
})

export default VagasScreen