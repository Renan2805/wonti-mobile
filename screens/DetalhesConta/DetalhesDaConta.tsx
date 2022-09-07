import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, Text, StyleSheet, View, Image ,TouchableOpacity, ImageBackground, StatusBar, Alert, ActivityIndicator, Platform } from 'react-native'
import DocumentPicker, { types } from 'react-native-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { FontAwesome } from '@expo/vector-icons';
import { RootStackParamList } from '../../types'
import { auth, storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable, UploadTask } from 'firebase/storage';

import { AntDesign, Entypo } from '@expo/vector-icons';
import { useCallback, useState, useEffect } from 'react';
import Header from '../../components/Header';
import { setPersistence, updateProfile } from '@firebase/auth';

type Props = NativeStackScreenProps<RootStackParamList>

const DetalhesDaConta = ({ navigation }: Props) => {

  const [user, setUser] = useState(auth.currentUser)
  const [profileImage, setProfileImage] = useState('')

  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [error, setError] = useState('')

  const [isUploading, setIsUploading] = useState(false)
  const [status, setStatus] = useState('')

  const askPermision = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Precisamos de permição para mudar a foto de perfil");
      } else setStatus(status)
    }
  }

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    handleImagePicked(pickerResult)
  }

  const handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {
    try {
      setIsUploading(true)

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        console.log('URL:', uploadUrl)
        if(auth.currentUser) updateProfile(auth.currentUser, {
          photoURL: uploadUrl
        })
        setProfileImage(uploadUrl)
        console.log('User: ', auth.currentUser)
      }
    } catch (e) {
      console.log(e);
      if(typeof e === 'string') setError(e)
    } finally {
      setIsUploading(false)
    }
    }

  
    const uploadImageAsync = async (uri: string) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, `Users/${user?.uid}/Profile`);
    // @ts-ignore
    const result = await uploadBytes(fileRef, blob);
    
    // @ts-ignore
    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  }

  const maybeRenderUploadingOverlay = () => {
    if (isUploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator animating size="large" />
        </View>
      )
    }
  }

  
  useEffect(() => {
    if(auth.currentUser?.photoURL) setProfileImage(auth.currentUser?.photoURL)
  }, [auth.currentUser])

  return (
    <ScrollView contentContainerStyle={style.content}>
      <ImageBackground
        source={require('../../assets/images/FundoVideo.png')}
        style={[style.fundo, {paddingTop: StatusBar.currentHeight}]}
        imageStyle={{borderBottomLeftRadius: 35, borderBottomRightRadius: 35}}
      >
        <View style={style.header}>
          <AntDesign name="arrowleft" size={35} color="white" onPress={() => navigation.goBack()}/>
          <Entypo name="dots-three-vertical" size={25} color="white" onPress={() => setIsOptionsOpen(!isOptionsOpen)}/>
        </View>
        <TouchableOpacity style={style.profilePictureWrapper} onPress={() => {}}>
          <Image 
            // @ts-ignore
            source={{uri: profileImage}}
            style={style.profilePicture}
          />
        </TouchableOpacity>
        <Text style={style.name}>{user?.displayName}</Text>
      </ImageBackground>
      {
        isOptionsOpen 
        ?
        <View style={style.options}>
          <TouchableOpacity style={style.optionsRow} onPress={() => status == 'granted' ? pickImage() : askPermision()}>
            <FontAwesome name="camera" size={24} color="black" />
            <Text style={style.optionsText}>Trocar Foto de Perfil</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={style.optionsRow} onPress={() => {}}>
            <FontAwesome name="camera" size={24} color="black" />
            <Text style={style.optionsText}>Trocar Foto de Perfil</Text>
          </TouchableOpacity>
          

          <TouchableOpacity style={[style.optionsRow, {borderBottomWidth: 0}]} onPress={() => {}}>
            <FontAwesome name="google" size={24} color="black" />
            <Text style={style.optionsText}>Trocar Foto de Perfil</Text>
          </TouchableOpacity>
          
        </View>
        :
        <></>
      }
      {
        maybeRenderUploadingOverlay()
      }
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