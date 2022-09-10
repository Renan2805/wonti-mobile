import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, StatusBar, SafeAreaView, FlatList } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import CardRecommended from '../components/CardRecommended/CardRecommended'
import SearchBar from '../components/SearchBar/SearchBar'
import { RootTabScreenProps } from '../types'
import { auth } from '../config/firebase'
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

  }, [user])

  // @ts-ignore
  const _renderItem = ({item}) => (
    <CardRecommended 
      theme={item.theme} 
      image={item.image} 
      title={item.title} 
      hirer={item.hirer} 
      description={item.description} 
      time={item.time} 
      type={item.type} 
      salary={item.salary} 
      competitors={item.competitors} 
      place={item.place} 
      posted={item.posted} 
      full={item.full}      
    />
  )

  const DATA = [
    {
      hirer: 'Google'
    },
    {
      hirer: 'Google'
    },
    {
      hirer: 'Google'
    },
    {
      hirer: 'Google'
    },
  ]

  if(!isLoading)
  return (
    <SafeAreaView style={style.safeView}>
      <ExpoStatusBar.StatusBar translucent={true}/>
      <HomeHeader />
      <ScrollView contentContainerStyle={style.content} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true} >
      <View style={{width: '100%', alignItems: 'center'}}>
        <SearchBar />
      </View>
      <View style={style.sectionRecomendados}>
        <Text style={style.title}>Recomendados</Text>
        <FlatList 
          data={DATA}
          renderItem={_renderItem}
          horizontal={true}

        />
      </View>
      </ScrollView>
      </SafeAreaView>
  )
  else return (
    <Loader />
  )
}

const HomeHeader = () => {
  return (
    <View style={{height: '10%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10}}>
      <Image 
        source={require('../assets/images/logoWonti.png')}
        style={{height: 30, width: 100}}
      />
      <Image
        // @ts-ignore
        source={{uri: auth.currentUser?.photoURL}}
        style={{height: '100%', aspectRatio: 1 / 1, borderRadius: 100}}
      />
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
    flex:1,
    width: '100%',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22
  },
  sectionRecomendados: {
    paddingHorizontal: 10
  }
})

export default HomeScreen