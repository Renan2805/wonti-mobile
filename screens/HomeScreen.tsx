import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, StatusBar, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import CardRecommended from '../components/CardRecommended/CardRecommended'
import SearchBar from '../components/SearchBar/SearchBar'
import { RootTabScreenProps } from '../types'
import { getData } from '../hooks/useAsyncStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = ({ navigation, route }: RootTabScreenProps<'Home'>) => {

  const [uid, setUid] = useState('')

  const fetchData = async () => {
    const d = await getData('uid')
      .then(data => data)
      .catch(e => console.log(e))
    setUid(d)
  }

  useEffect(() => {
    const keys = AsyncStorage.getAllKeys()
    console.log(keys)
    
  }, [uid])
  

  return (
    <SafeAreaView style={style.safeView}>
      <ExpoStatusBar.StatusBar translucent={true}/>
      <ScrollView contentContainerStyle={style.content} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true} >
      <View style={{width: '100%', alignItems: 'center'}}>
        <SearchBar />
      </View>
      <Text>{uid ? uid : 'Vazio'}</Text>
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