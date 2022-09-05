import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, Text, StyleSheet, View, Image ,TouchableOpacity, ImageBackground, StatusBar } from 'react-native'
import DocumentPicker, { types } from 'react-native-document-picker'
import { RootStackParamList } from '../../types'
import { auth } from '../../config/firebase';

import { AntDesign, Entypo } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import Header from '../../components/Header';

type Props = NativeStackScreenProps<RootStackParamList>

const DetalhesDaConta = ({ navigation }: Props) => {

  const [user, setUser] = useState(auth.currentUser)
  const [profileImage, setProfileImage] = useState('')

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: types.images
      });
      if(response.fileCopyUri !== null) setProfileImage(response.fileCopyUri)
    } catch (err) {
      console.warn(err);
    }
  }, []);


  return (
    <ScrollView contentContainerStyle={style.content}>
      <ImageBackground
        source={require('../../assets/images/FundoVideo.png')}
        style={[style.fundo, {paddingTop: StatusBar.currentHeight}]}
      >
        <View style={style.header}>
          <AntDesign name="arrowleft" size={35} color="white" onPress={() => navigation.goBack()}/>
          <Entypo name="dots-three-vertical" size={25} color="white" />
        </View>
        <TouchableOpacity style={style.profilePictureWrapper} onPress={() => handleDocumentSelection()}>
          <Image 
            // @ts-ignore
            source={{uri: user?.photoURL}}
            style={style.profilePicture}
          />
        </TouchableOpacity>
        <Text style={style.name}>{user?.displayName}</Text>
      </ImageBackground>
    </ScrollView>
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
    width: 90,
    height: 90,
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 100
  },
  profilePicture: {
    width: '100%',
    height: '100%'
  },
  name: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
    color: 'white'
  }
})

export default DetalhesDaConta