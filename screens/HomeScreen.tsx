import React from 'react'
import { ScrollView, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import CardRecommended from '../components/CardRecommended/CardRecommended'
import SearchBar from '../components/SearchBar/SearchBar'
import { RootTabScreenProps } from '../types'

const HomeScreen = ({ navigation, route }: RootTabScreenProps<'Home'>) => {

  return (
    <SafeAreaView style={{height: '100%', paddingTop: StatusBar.currentHeight}}>
      <ScrollView contentContainerStyle={style.content} horizontal={false}>
        <SearchBar />
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
          theme={false}
          time={'Integral'}
          type={'Remoto'}
          salary={2000}
          competitors={20}
          place={'São Paulo, SP'}
          posted={2}
          full={false}
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
          full={false}
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
          full={false}
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
          full={false}
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
          full={false}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'visible'
  }
})

export default HomeScreen