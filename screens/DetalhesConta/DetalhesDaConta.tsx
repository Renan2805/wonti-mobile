import { ScrollView, Text, StyleSheet, View, Image ,TouchableOpacity, ImageBackground, StatusBar, Alert, ActivityIndicator, Platform, Modal, Linking, Touchable } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import { ConfigStackScreenProps, User } from '../../types'
import { auth, db } from '../../config/firebase';
import { addDoc, collection, getDoc, doc, DocumentData } from 'firebase/firestore'
import Unorderedlist from 'react-native-unordered-list';

import { Location } from 'react-native-iconly';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';;

const DetalhesDaConta = ({ navigation }: ConfigStackScreenProps<'DetailScreen'>) => {

  const [user, setUser] = useState(auth.currentUser)
  const [userData, setUserData] = useState<User>()
  const [profileImage, setProfileImage] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [error, setError] = useState('')
  
  const getUserData = async () => {
    try {
      const docRef = doc(db, `Users/${user && user?.uid}`)
      const docSnap   = await getDoc(docRef)
      if(docSnap.exists()) {
        // @ts-ignore
        setUserData(docSnap.data())
        setIsLoading(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const mascaraNumero = (n: string) => {
    n = n.replace(/\D/, '')
    if(n.length == 11) n = n.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    else if(n.length == 12) n = n.replace(/(\d{2})(\d{6})(\d{4})/, '($1) $2-$3')
    return n
  }

  useEffect(() => {
    if(auth.currentUser) {
      getUserData()
      if(auth.currentUser.photoURL) setProfileImage(auth.currentUser?.photoURL)
    } else setIsLoading(true)
  }, [auth.currentUser])

  if(!isLoading && userData)
  return (
    <View style={style.content}>
      <ExpoStatusBar.StatusBar translucent={true} style={'light'}/>
      <ImageBackground
        source={require('../../assets/images/FundoVideo.png')}
        style={[style.fundo, {paddingTop: StatusBar.currentHeight}]}
        imageStyle={{borderBottomLeftRadius: 35, borderBottomRightRadius: 35}}
      >
        <View style={style.header}>
          <AntDesign name="arrowleft" size={35} color="white" onPress={() => navigation.goBack()}/>
          <AntDesign name="edit" size={25} color="white" onPress={() => navigation.navigate('ConfigConta')}/>
        </View>
        <TouchableOpacity style={style.profilePictureWrapper} onPress={() => {}}>
          <Image 
            // @ts-ignore
            source={profileImage ? {uri: profileImage} : require('../../assets/images/DefaultProfile.png')}
            style={style.profilePicture}
          />
        </TouchableOpacity>
        <Text style={style.name}>{user?.displayName}</Text>
        <Text style={[style.infoText, {fontSize: 20}]}>{userData?.formacao.qualificacao}</Text>
        <View
          style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center'}}
        >
          <View
            style={{flexDirection: 'row'}}
          >
            <Location set="light" color={'#fff'}/>
            <Text style={style.infoText}>{userData?.endereco.cidade}</Text>
          </View>
          <View
            style={{flexDirection: 'row'}}
          >
            <MaterialCommunityIcons name="certificate" size={24} color="white" />
            <Text style={style.infoText}>{userData?.formacao.instituicao}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={style.mainSection}>
        <View style={style.aboutSection}>
          <Text style={[style.title, {alignSelf: 'flex-start', marginBottom: 15}]}>Sobre</Text>
          <View style={{width: '90%', alignItems: 'center'}}>
            {
              
              userData.informacoes.length === 0 ?
              <Text>Nada aqui</Text>
              :
              userData.informacoes.map((item, index) => (
                <Unorderedlist key={index} style={{fontSize: 18}}>
                  <Text 
                    style={{fontSize: 18, fontFamily: 'Poppins_300Light', textAlign: 'justify'}}
                  >
                    {item}
                  </Text>
                </Unorderedlist>
              ))
            }
          </View>
        </View>
        <View style={style.infos}>
          <View style={style.infoRow}>
            <AntDesign name="download" size={30} color="rgba(0, 0, 0, .5)" />
            <View style={{marginHorizontal: 10}}>
              <Text style={style.infoRowTitle}>Currículo</Text>
              <Text style={style.infoRowText}>PDF</Text>
            </View>
          </View>
          <TouchableOpacity style={style.infoRow} onPress={() => Linking.openURL(`https://github.com/${userData.github}`)}>
            <AntDesign name="github" size={30} color="rgba(0, 0, 0, .5)" />
            <View style={{marginHorizontal: 10}}>
              <Text style={style.infoRowTitle}>Github</Text>
              <Text style={style.infoRowText}>{userData.github ? userData.github : 'Não informado'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={style.infoRow} onPress={() => Linking.openURL(`whatsapp://send?phone=+55${userData.numero_cel}`)}>
            <FontAwesome name="whatsapp" size={30} color="rgba(0, 0, 0, .5)" />
            <View style={{marginHorizontal: 10}}>
              <Text style={style.infoRowTitle}>WhatsApp</Text>
              <Text style={style.infoRowText}>{userData.numero_cel ? mascaraNumero(userData.numero_cel) : 'Não Informado'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={style.infoRow} onPress={() => Linking.openURL(`mailto:${userData.email}`)}>
            <MaterialCommunityIcons name="email" size={30} color="rgba(0, 0, 0, .5)" />
            <View style={{marginHorizontal: 10}}>
              <Text style={style.infoRowTitle}>Email</Text>
              <Text style={style.infoRowText}>{userData.email}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
  else return(
    <Text>Loading...</Text>
  )
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    height: '100%'
  },
  mainSection: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between'
  },
  aboutSection: {
    padding: 22,
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 22
  },
  fundo: {
    minWidth: '100%',
    aspectRatio: 1 / .7,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profilePictureWrapper: {
    width: 100,
    height: 100,
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 100,
    backgroundColor: 'white'
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  },
  name: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
    color: 'white'
  },
  options: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
    backgroundColor: '#d2d2d2',
    paddingHorizontal: 20,
    justifyContent: 'space-around'
  },
  optionsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  optionsText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 24
  },
  infoText: {
    fontFamily: 'Poppins_300Light',
    fontSize: 18,
    color: '#fff',
    marginHorizontal: 5
  },
  infos: {
    paddingHorizontal: 15,
  },
  infoRow: {
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, .2)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10

  },
  infoRowTitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: 'rgba(0, 0, 0, .5)'
  },
  infoRowText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
  }
})

export default DetalhesDaConta