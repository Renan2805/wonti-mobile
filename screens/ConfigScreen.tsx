import { IoMdLock,IoMdHelp } from 'react-icons/io'
import { ScrollView,Image,Text,StyleSheet, View, TouchableOpacity, StatusBar, Alert} from 'react-native'
import { RootTabScreenProps } from '../types'

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Notification, Bookmark, Lock, Logout } from 'react-native-iconly';

import { auth, db } from '../config/firebase';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import Header from '../components/Header';
import { signOut } from 'firebase/auth';

const ConfigScreen = ({ navigation }: RootTabScreenProps<'Config'>) => {

  const [user, setUser] = useState(auth.currentUser)
  const [profileImage, setProfileImage] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const doLogOut =  () => {
    Alert.alert('Sair', 'Deseja se desconectar?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: () => signOut(auth).catch(e => console.error(e))
      }
    ])
    // signOut(auth).catch(e => console.error(e))
  }

  // const fetchData = async () => {
  //   // @ts-ignore
  //   const d = doc(db, `Users/${user?.uid}`)
  //   const document = await getDoc(d)
  //   // @ts-ignore
  //   setAdress(document.data())
    
  // }

  useEffect(() => {
    if(auth.currentUser) {
      if(auth.currentUser.photoURL) setProfileImage(auth.currentUser?.photoURL)
      setIsLoading(false)

    }
    
  }, [auth.currentUser])

  if(!isLoading)
  return (
    <View
      style={style.content}
    >
      <Header />
      <View style={{paddingHorizontal: 20, width: '100%'}}>
        <View style={style.section1}>
          <Text style={style.title}>Conta</Text>
          <TouchableOpacity 
            style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}
            onPress={() => navigation.navigate('DetailScreen')}  
          >
            <Image 
              source={{uri: profileImage}}
              style={style.image}
            />
            <View style={{width: '50%'}}>
              <Text style={style.name}>{auth.currentUser?.displayName}</Text>
              <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 15, color: '#7C7C7C'}}>informações da conta</Text>
            </View>
            <FontAwesome5 name="angle-right" size={24} color="#7C7C7C" />
          </TouchableOpacity>
        </View>

        <View style={style.section2}>
          <Text style={style.title}>Geral</Text>
          <View style={style.buttons}>
            <TouchableOpacity 
              style={style.button}
              onPress={() => {}}
            >
              <View style={[style.iconWrapper, {backgroundColor: 'rgba(143, 0, 255, .15)'}]}>
                <Notification set={'bold'} size={30} color={'#8F00FF'} />
              </View>
              <Text style={style.buttonStyle}>Notificações</Text>
              <FontAwesome5 name="angle-right" size={24} color="#7C7C7C" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={style.button}
              onPress={() => {}}
            >
              <View style={[style.iconWrapper, {backgroundColor: 'rgba(0, 26, 255, .15)'}]}>
                <Bookmark set={'bold'} size={30} color={'#001AFF'} />
              </View>
              <Text style={style.buttonStyle}>Vagas salvas</Text>
              <FontAwesome5 name="angle-right" size={24} color="#7C7C7C" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={style.button}
              onPress={() => {}}
            >
              <View style={[style.iconWrapper, {backgroundColor: 'rgba(0, 148, 255, .15)'}]}>
                <Lock set={'bold'} size={30} color={'#0094FF'} />
              </View>
              <Text style={style.buttonStyle}>Privacidade</Text>
              <FontAwesome5 name="angle-right" size={24} color="#7C7C7C" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={style.button}
              onPress={() => {}}
            >
              <View style={[style.iconWrapper, {backgroundColor: 'rgba(65, 188, 70, .15)'}]}>
                <MaterialIcons name="security" size={30} color="#41BC46" />
              </View>
              <Text style={style.buttonStyle}>Segurança</Text>
              <FontAwesome5 name="angle-right" size={24} color="#7C7C7C" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={style.button}
              onPress={() => {}}
            >
              <View style={[style.iconWrapper, {backgroundColor: 'rgba(255, 122, 0, .15)'}]}>
                <Entypo name="help" size={30} color="#FF7A00" />
              </View>
              <Text style={style.buttonStyle}>Ajuda e Suporte</Text>
              <FontAwesome5 name="angle-right" size={24} color="#7C7C7C" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={style.button}
              onPress={() => doLogOut()}
            >
              <View style={[style.iconWrapper, {backgroundColor: 'rgba(255, 0, 0, .15)'}]}>
                <Logout set={'bold'} size={30} color="#FF0000" />
              </View>
              <Text style={style.buttonStyle}>Sair</Text>
              <FontAwesome5 name="angle-right" size={24} color="#7C7C7C" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
  else return (
    <Loader />
  )
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor:'white',
    alignItems: 'center',
  },
  section1: {
    flex: 0,
    height: '20%'
  },
  section2: {
    height: '70%'
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 26
  },
  image: {
    width: 80,
    aspectRatio: 1 / 1,
    borderRadius: 50
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    margin: 0
  },
  buttons: {
    height: '100%',
    justifyContent: 'space-around',
  },
  button: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonStyle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    flex: .9
  },
  iconWrapper: {
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ConfigScreen