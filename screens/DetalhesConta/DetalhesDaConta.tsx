import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, Text, StyleSheet, View, Image ,TouchableOpacity, ImageBackground } from 'react-native'
import { RootStackParamList } from '../../types'
import { auth } from '../../config/firebase';

import { AntDesign, Entypo } from '@expo/vector-icons';
import { useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList>

const DetalhesDaConta = ({ navigation }: Props) => {

  const [user, setUser] = useState(auth.currentUser)

  return (
    <ScrollView contentContainerStyle={style.content}>
      <View style={style.fundo}>
        <ImageBackground source={require('../../assets/images/FundoVideo.png')}
        style={style.imagemFundo}
        imageStyle={{borderBottomRightRadius:50,borderBottomLeftRadius:50,}}>
        <View style={style.separarButton}>
          <TouchableOpacity style={style.barra} onPress={() => navigation.navigate('App')}>
             <AntDesign name="arrowleft" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={style.tresPontinhos}>
             <Entypo name="dots-three-vertical" size={30} color="white" />
          </TouchableOpacity>
        </View>
        </ImageBackground>
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    display:'flex'
  },
  fundo: {
    display:'flex',
    width:'100%',
    height:300,
    borderBottomRightRadius:50,
    borderBottomLeftRadius:50,
  },
  barra: {
    width:40,
    height:20
  },
  separarButton: {
    width:'100%',
    padding:'5%',
    display:'flex',
    textAlign:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  tresPontinhos: {
    width:13,
    height:20,
    marginTop:7,
    marginLeft:'77%',
  },
  imagemFundo: {
    width:'100%',
    height:'100%',
  }
})

export default DetalhesDaConta