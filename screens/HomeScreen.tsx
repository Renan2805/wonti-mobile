import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, StatusBar, SafeAreaView, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import CardRecommended from '../components/CardRecommended/CardRecommended'
import SearchBar from '../components/SearchBar/SearchBar'
import { RootTabScreenProps } from '../types'
import { getData } from '../hooks/useAsyncStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../config/firebase'
import { updateProfile } from '@firebase/auth'

const HomeScreen = ({ navigation, route }: RootTabScreenProps<'Home'>) => {

  const [user, setUser] = useState(auth.currentUser)
  const [isLoading, setIsLoading] = useState(false)

  // const fetchData = async () => {
  //   setIsLoading(true)
  //   await getData('firebase:authUser:AIzaSyBTw0Mu9UEKDx01aGzZKmvmPniUHCha128:[DEFAULT]').then(data => {
  //     // @ts-ignore
  //     setUser(JSON.parse(data))
  //     console.log(data)
  //     setIsLoading(false)
  //   })
  //   const keys = await AsyncStorage.getAllKeys()
  //   console.log(keys)
    
  // }

  useEffect(() => {
    updateProfile(user, {
      photoURL: 'data:image/jpeg;base64,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'
    })
  }, [])
  if(!isLoading)
  return (
    <SafeAreaView style={style.safeView}>
      <ExpoStatusBar.StatusBar translucent={true}/>
      <ScrollView contentContainerStyle={style.content} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true} >
      <View style={{width: '100%', alignItems: 'center'}}>
        <SearchBar />
      </View>
      <Text>{user.uid}</Text>
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'}/>
    </View>
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

export default HomeScreen