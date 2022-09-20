import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, StatusBar, SafeAreaView, FlatList, Alert, Dimensions, TouchableOpacity } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import CardRecommended from '../components/CardRecommended/CardRecommended'
import SearchBar from '../components/SearchBar/SearchBar'
import { RootTabScreenProps } from '../types'
import { auth } from '../config/firebase'
import Loader from '../components/Loader/Loader'
import Carousel from 'react-native-snap-carousel'
import useWindowDimensions from '../hooks/useWindowDimension'

const HomeScreen = ({ navigation, route }: RootTabScreenProps<'Home'>) => {
  
  const [user, setUser] = useState(auth.currentUser)
  const [isLoading, setIsLoading] = useState(true)
  const [carousel, setCarousel] = useState({})

  const [test, setTest] = useState('')

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
      theme={true}
      full={true}
      jobId={item.id}
       
    />
  )

  const doSearch = () => {
    Alert.alert('teste')
  }

  const filter = () => {
    Alert.alert('teste 2')
  }

  const DATA = [
    {
      id: 'CQg7xkDZSrZBi6z6mYg2'
    },
    {
      id: 'dAcbFWzeQFClwHpEC5bB'
    },
    {
      id: 'CQg7xkDZSrZBi6z6mYg2'
    },
  ]

  if(!isLoading)
  return (
    <View style={style.safeView}>
      <ExpoStatusBar.StatusBar translucent={true} backgroundColor={''}/>
      <HomeHeader />
      <ScrollView
        contentContainerStyle={style.content}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
      >
        <SearchBar 
          _onChangeText={(text) => setTest(text)}
          _onPressS={() => doSearch()}
          _onPressF={() => filter()}
        />
        <View style={style.sectionRecomendados}>
          <Text style={[style.title]}>Recomendados</Text>
          
          <View style={style.carouselWrapper}>
            <Carousel 
              data={DATA}
              renderItem={(item) => _renderItem(item)}
              ref={c => c && setCarousel(c)}
              sliderWidth={Dimensions.get('screen').width}
              itemWidth={(Dimensions.get('screen').width * 80) / 100}
              
            />
          </View>
        </View>
      </ScrollView>
    </View>
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
      <TouchableOpacity onPress={() => {}}>
        <Image
          // @ts-ignore
          source={{uri: auth.currentUser?.photoURL}}
          style={{height: '100%', aspectRatio: 1, borderRadius: 100}}
        />
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  safeView :{
    paddingTop: StatusBar.currentHeight,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  content: {
    flex: 0,
    width: '100%',
    alignItems: 'center',
    
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
    minWidth: '95%'
  },
  sectionRecomendados: {
    minWidth: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  carouselWrapper: {
    width: '100%',
    alignItems: 'center'
  }
})

export default HomeScreen