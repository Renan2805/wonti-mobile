import { IoMdLock,IoMdHelp } from 'react-icons/io'
import { ScrollView,Image,Text,StyleSheet, View, TouchableOpacity, StatusBar, Modal} from 'react-native'
import { RootTabScreenProps } from '../types'

import CardRecommended from '../components/CardRecommended/CardRecommended';

import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { auth, db } from '../config/firebase';
import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Loader from '../components/Loader/Loader';
import { updateCurrentUser, updateProfile, signOut } from '@firebase/auth';


const ConfigScreen = ({ navigation }: RootTabScreenProps<'Config'>) => {
  const [modalActive, setmodalActive] = useState(false)
  const [user, setUser] = useState(auth.currentUser)
  const [profileImage, setProfileImage] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const [CardRecommended, setCardRecommended] = useState(false)

  const logOut =  () => {
    signOut(auth).catch(e => console.error(e))
  }

  // const fetchData = async () => {
  //   // @ts-ignore
  //   const d = doc(db, `Users/${user?.uid}`)
  //   const document = await getDoc(d)
  //   // @ts-ignore
  //   setAdress(document.data())
    
  // }
  const sairButton = () => {
    if(modalActive) {
      setmodalActive(false)
    }
  }

  useEffect(() => {
    if(auth.currentUser) {
      if(auth.currentUser.photoURL) setProfileImage(auth.currentUser?.photoURL)
      setIsLoading(false)

    }
    
  }, [auth.currentUser])

  if(!isLoading)
  return (
    <ScrollView contentContainerStyle={style.content}>
      <View style={{width:'100%', padding: 32, marginTop: StatusBar.currentHeight}}>
        <Text style={style.TextConta}>Conta</Text>
      </View>
      <View style={{width:'100%',flexDirection:'row', display:'flex', paddingLeft: 32}}>
        <View style={{
         width: 90,
         height: 91,
         borderRadius:100, 
         borderWidth:1}}>
          <Image
            // @ts-ignore
            source={{uri: auth.currentUser?.photoURL}}
            style={style.Perfil}  
          />
      </View>
         {/* @ts-ignore  */}
        <TouchableOpacity style={style.ButtonView} onPress={() => {navigation.navigate('DetailScreen')}}>
          <Text style={style.TextNome}>{user?.displayName}</Text>
          <Text style={style.TextDesc}>Informações da conta</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 32}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%', padding: 32}}>
        <Text style={style.TextConta}>Geral</Text>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom: 16, display:'flex', paddingLeft: 32}}>
        <View style={{
         padding: 12, 
         backgroundColor:'#8F00FF26', 
         width: 63,
         height: 63,
         borderRadius:100, 
         }}>
          <Ionicons name="notifications" size={40} color="purple" />
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Notificações</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 16}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom: 16, display:'flex', paddingLeft: 32}}>
        <View style={{
         padding: 9,
         paddingLeft:10, 
         backgroundColor:'#8F00FF26', 
         alignItems:'center',
         width: 63,
         height: 63,
         borderRadius:100, 
         }}>
          
          <Ionicons name="bookmark" size={40} color="blue" />
        </View>
        <TouchableOpacity style={style.ButtonView} onPress={()=> setmodalActive(true)}>
          <Text style={style.TextNome}>Vagas salvas</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 16}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom: 16, display:'flex', paddingLeft: 32}}>
        <View style={{
         padding: 9,
         paddingLeft:13,
         backgroundColor:'#001AFF26',
         width: 63,
         height:63,
         borderRadius:100, 
         }}>
          <Ionicons name="md-lock-closed" size={40} color="black" />
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Privacidade</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 16}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom: 16, display:'flex', paddingLeft: 32}}>
        <View style={{
         padding: 9,
         paddingLeft:12, 
         backgroundColor:'#D8F6CE',
         width: 63,
         height: 63,
         borderRadius:100, 
         }}>
          <FontAwesome5 name="shield-alt" size={40} color="green" />
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Segurança</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 16}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom: 16, display:'flex', paddingLeft: 32}}>
        <View style={{
         padding: 9, 
         paddingLeft:12,
         backgroundColor:'#F3E2A9',
         width: 63,
         height: 63,
         borderRadius:100, 
         }}>
          <Ionicons name="md-help" size={40} color="#FF8000" />
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Ajuda e suporte</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 16}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View><View style={{width:'100%',flexDirection:'row', display:'flex',marginBottom: 32, paddingLeft: 32}}>
        <View style={{
         padding: 11, 
         paddingLeft:15,
         backgroundColor:'#FF7A0026',
         width: 63,
         height: 63,
         borderRadius:100, 
         }}>
          <Entypo name="log-out" size={40} color="red" onPress={() => logOut()}/>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Sair</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 16}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View> 
      <Modal
      transparent={true}
      animationType='slide'
      onRequestClose={()=> setmodalActive(false)}
      visible={modalActive}
      >
         <TouchableOpacity style={style.botaoSairModal} onPress={sairButton}></TouchableOpacity>
         <ScrollView style={style.viewModal}>
            <View style={style.ModalText}>
              <Text style={{fontSize:25, fontWeight:'700'}}>Vagas salvas</Text>
            </View>
         </ScrollView>
      </Modal>
    </ScrollView>
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
  // TextConta: {
  //   fontSize:30
  // },
  // TextNome: {
  //   fontSize:23,
  //   width:'100%'
  // },
  // TextDesc: {
  //   fontSize:18,
  //   width:'100%'
  // },
  // ButtonView: {
  //   padding:'1rem',
  //   flex:1,
  //   display:'flex',
  // },
  // Flecha: {
  // }
  botaoSairModal: {
    height:'50%',
    backgroundColor:'transparent',
  },
  viewModal: {

    height:'60%',
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
    backgroundColor:'#E6E6E6',
    shadowColor:'#000',
    shadowOffset: {
      width: 0,
      height:2
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5
  },
  ModalText: {
    width:'100%',
    textAlign:'center',
    padding:20,
  },
  Perfil: {
    width: '100%',
    height: '100%',
    borderRadius:100
  },
  TextConta: {
    fontSize:30,
    fontWeight:'bold'
  },
  TextNome: {
    fontSize:23,
    fontWeight:'bold',
    width:'100%'
  },
  TextDesc: {
    fontSize:18,
    width:'100%'
  },
  imageConfig: {
    width:'100%',
    height:'100%'
  },
  ButtonView: {
    padding: 16,
    flex:1,
    display:'flex',
  },
  Flecha: {
  }
})

export default ConfigScreen