import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, StatusBar, Alert, Dimensions, TouchableOpacity } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import CardRecommended from '../components/CardRecommended/CardRecommended'
import SearchBar from '../components/SearchBar/SearchBar'
import { RootTabScreenProps } from '../types'
import { auth, db } from '../config/firebase'
import Loader from '../components/Loader/Loader'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { updateProfile } from 'firebase/auth'
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";


const HomeScreen = ({ navigation, route }: RootTabScreenProps<'HomeTab'>) => {
  
  const [user, setUser] = useState(auth.currentUser)
  const [isLoading, setIsLoading] = useState(true)
  const [carousel, setCarousel] = useState({})

  const [vagasRecom, setVagasRecom] = useState([])

  const [test, setTest] = useState('')

  useEffect(() => {
    if(auth.currentUser) {
      updateProfile(auth?.currentUser, {
        photoURL: undefined
      })
        setIsLoading(false)
      }else {
      setIsLoading(true)
    }

    fetchtVagasRecomendadas()

    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
    })

  }, [])

  // @ts-ignore
  const _renderItem = ({item}) => (
    <CardRecommended
      theme={true}
      full={true}
      jobId={item.id}
      _style={{marginVertical: 15}}
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
      id: 'CQg7xkDZSrZBi6z6mYg2'
    },
    {
      id: 'CQg7xkDZSrZBi6z6mYg2'
    },
  ]
    const fetchtVagasRecomendadas = async() => {
      try {
        const q = query(collection(db, "Jobs"), orderBy('Competitors', 'desc'), limit(10));
  
        await getDocs(q).then(doc => {
          console.log(doc.forEach(doc => {
            // @ts-ignore
            setVagasRecom(vagas => [...vagas, doc.id])
          }))

        })
      } catch (e) {
        console.log(e)
      }
    }
  if(!isLoading)
  return (
    <View style={style.safeView}>
      <ExpoStatusBar.StatusBar translucent={true} style={'dark'}/>
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
            <ScrollView style={{flexDirection:'column'}}>
              <Carousel 
               data={DATA}
               renderItem={(item) => _renderItem(item)}
                ref={c => c && setCarousel(c)}
                sliderWidth={Dimensions.get('screen').width}
                itemWidth={(Dimensions.get('screen').width * 80) / 100}
              
              />
              </ScrollView>
          </View>
        </View>
        <View style={style.sectionPopulares}>
          <Text style={[style.title]}>Populares</Text>
          {
            vagasRecom && vagasRecom.map(idVaga => (
              <CardRecommended 
                jobId={idVaga}
                theme={false}
                full={false}
                _style={{marginBottom:10, maxWidth: '90%'}}
              />
            ))
          }
        </View>
      </ScrollView>
   
    </View>
  )
  else return (
    <Loader />
  )
}

const HomeHeader = () => {

  const [profileImage, setProfileImage] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    if(auth.currentUser) {
      if(auth.currentUser.photoURL) setProfileImage(auth.currentUser?.photoURL)
    }
  }, [auth.currentUser])

  return (
    <View style={{height: '10%', width: '95%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10}}>
      <Image 
        source={require('../assets/images/logoWonti.png')}
        style={{height: 30, width: 100}}
      />
      <TouchableOpacity onPress={() => navigation.navigate('DetailScreen')}>
        <Image
          // @ts-ignore
          source={profileImage ? {uri: profileImage} : require('../assets/images/DefaultProfile.png')}
          style={{height: '80%', aspectRatio: 1, borderRadius: 100}}
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
    marginTop: 20,
  },
  sectionPopulares: {
    width: '100%',
    marginHorizontal: 10,
    textAlign:'center',
    alignItems:'center'
  },
  carouselWrapper: {
    width: '100%',
    alignItems: 'center',
  },
})

export default HomeScreen