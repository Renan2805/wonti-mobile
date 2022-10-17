import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, Text, StyleSheet, View, Image ,TouchableOpacity, ImageBackground, StatusBar, Alert, ActivityIndicator, Platform, Modal } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import DocumentPicker, { types } from 'react-native-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { FontAwesome } from '@expo/vector-icons';
import { ConfigStackScreenProps } from '../../types'
import { auth, db, storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable, UploadTask } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore'

import { AntDesign, Entypo } from '@expo/vector-icons';
import { useCallback, useState, useEffect } from 'react';
import Header from '../../components/Header';
import { setPersistence, updateProfile } from '@firebase/auth';

const DetalhesDaConta = ({ navigation }: ConfigStackScreenProps<'DetailScreen'>) => {

  const [user, setUser] = useState(auth.currentUser)
  const [profileImage, setProfileImage] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [error, setError] = useState('')
  
  useEffect(() => {
    if(auth.currentUser) {
      setIsLoading(false)
    } else setIsLoading(true)
  }, [auth.currentUser])

  if(!isLoading)
  return (
    <ScrollView contentContainerStyle={style.content}>
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
            source={auth.currentUser?.photoURL === undefined ? require('../../assets/images/DefaultProfile.png') : {uri: auth.currentUser?.photoURL}}
            style={style.profilePicture}
          />
        </TouchableOpacity>
        <Text style={style.name}>{user?.displayName}</Text>

      </ImageBackground>
      <TouchableOpacity onPress={async () => {
        const docRef = await addDoc(collection(db, 'Jobs'), {
          Competitors: 91,
          Description: "Desenvolvedor Front End",
          Hirer: "Facebook",
          HirerUid: "L62Jf6O02ZguvJClvf1aPhgBVaG3",
          Place: "São Paulo",
          Posted: 3,
          Salary: 3000,
          Time: "Integral",
          Title: "Dev. Front End",
          Type: "Remoto"
        })
        console.log('Job ID: ', docRef.id)
      }}>
        <Text>Teste</Text>
      </TouchableOpacity>
    </ScrollView>
  )
  else return (
    <Text>Loading...</Text>
  )
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    height: '100%'
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
  }
})

export default DetalhesDaConta