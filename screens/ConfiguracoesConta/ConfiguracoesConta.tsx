import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Touchable,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native'

import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { TickSquare, Camera } from 'react-native-iconly'
import * as ImagePicker from 'expo-image-picker'

import { RootStackScreenProps } from '../../types'
import { SetStateAction, useEffect, useState } from 'react'
import * as ExpoStatusBar from 'expo-status-bar'
import { auth, storage } from '../../config/firebase'
import { updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'

const ConfiguracoesConta = ({navigation}: RootStackScreenProps<'App'>) => {
  
  const [profileImage, setProfileImage] = useState<string | null>()
  const [user, setUser] = useState(auth.currentUser)
  const [isLoading, setIsLoading] = useState(true)

  const [isEnabled, setIsEnabled] = useState(true)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [error, setError] = useState('')

  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
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

  const takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    handleImagePicked(pickerResult);
  };

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
      }
    } catch (e) {
      if(typeof e === 'string') setError(e)
      Alert.alert(error)
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
        console.error(e)
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, `Users/${auth.currentUser?.uid}/Profile`);
    // @ts-ignore
    const result = uploadBytesResumable(fileRef, blob);
    result.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      (error) => {
        setError(error.message)
        console.error(error)
      },
      () => {
        setIsUploading(false)
        // @ts-ignore
        // We're done with the blob, close and release it
        blob.close();
      })

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
          <Text>{progress + '%'}</Text>
        </View>
      )
    }
  } 

  const Header = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, marginTop: StatusBar.currentHeight}}>
        <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : {}}>
          <AntDesign name="arrowleft" size={35} color="black" />
        </TouchableOpacity>
        <Text style={{fontFamily: 'Poppins_700Bold', fontSize: 20, textAlign: 'center'}}>Informações</Text>
        <TickSquare set={'bold'} size={30} color={'black'}/>
      </View>
    )
  }

  useEffect(() => {
    if(user === null) {
      setIsLoading(true)
    }else {
      user?.photoURL && setProfileImage(user.photoURL)
      setIsLoading(false)
    }
  }, [user])

  if(!isLoading) return (
    <>
    <ExpoStatusBar.StatusBar translucent={true} style={'dark'}/>
    <ScrollView>
      <Header />
      <View style={styles.switches}>
        <TouchableOpacity 
          style={[styles.switch, isEnabled ? styles.enabled : styles.disabled]}
          onPress={() => setIsEnabled(true)}
        >
          <Text style={isEnabled ? styles.textEnabled : styles.textDisabled}>Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.switch, isEnabled ? styles.disabled : styles.enabled]}
          onPress={() => setIsEnabled(false)}  
        >
          <Text style={isEnabled ? styles.textDisabled : styles.textEnabled}>Dados</Text>
        </TouchableOpacity>

      </View>
      <View style ={styles.content} >
        <View style={styles.imageWrapper}>
          <Image 
            // @ts-ignore
            source={{uri: auth.currentUser?.photoURL}}
            style={styles.image}
          />
          <TouchableOpacity style={styles.cameraButton} onPress={() => setIsOptionsOpen(!isOptionsOpen)}>
            <Camera set="bold" color={'white'}/>
          </TouchableOpacity>
        </View>
        {
          isEnabled ?
            <View style={styles.account}>
              <View style={styles.labeledInput}>
                <Text style={styles.label}>Nome de Usuário</Text>
                {/* @ts-ignore */}
                <TextInput value={user?.displayName} onChangeText={(text) => {setUser({displayName: text})}} style={styles.input}/>
              </View>
              <View style={styles.labeledInput}>
                <Text style={styles.label}>Local em que reside</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TextInput value={'Nome'} onChangeText={() => {}} style={[styles.input, {width: '65%'}]}/>
                  <TextInput value={'Nome'} onChangeText={() => {}} style={[styles.input, {width: '30%'}]}/>
                </View>
              </View>
              <View style={styles.labeledInput}>
                <Text style={styles.label}>Nome de Usuário</Text>
                <TextInput value={'Nome'} onChangeText={() => {}} style={styles.input}/>
              </View>
            </View>
          :
            <View>
              <Text>Wot</Text>
            </View>
        }
      </View>
    </ScrollView>
    {
      isOptionsOpen &&
      <View style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, .1)'}}>
        <TouchableOpacity style={{width: '100%', height: '83%'}} onPress={() => setIsOptionsOpen(false)}/>
        <View style={styles.options}>
          <TouchableOpacity style={[styles.optionsRow, {borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, .3)'}]} onPress={() => status == 'granted' ? takePhoto() : askPermision()}>
            <FontAwesome name="camera" size={24} color="black" />
            <Text style={styles.optionsText}>Tirar Foto</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionsRow} onPress={() => status == 'granted' ? pickImage() : askPermision()}>
            <FontAwesome name="folder" size={24} color="black" />
            <Text style={styles.optionsText}>Escolher Foto da Galeria</Text>
          </TouchableOpacity>
        </View>
      </View>
    }
    {
      maybeRenderUploadingOverlay()
    }
    </>
  ) 
  else return (
    <Text>Carregando...</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  content: {
    alignItems: 'center',
    margin: 30
  },
  switches: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    borderRadius: 68,
    paddingHorizontal: 45,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderWidth: 2,
  },
  enabled: {
    backgroundColor:'black',
    borderColor: 'black'
  },
  disabled: {
    backgroundColor: 'rgba(0, 0, 0, .02)',
    borderColor: '#EAEAEA'
  },
  textEnabled: {
    fontFamily: 'WorkSans_600SemiBold',
    fontSize: 18,
    color: 'white'
  },
  textDisabled: {
    fontFamily: 'WorkSans_500Medium',
    fontSize: 18,
    color: 'rgba(0, 0, 0, .3)'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  imageWrapper: {
    minWidth: 100,
    minHeight: 100,
    borderRadius: 100
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF0356',
    borderRadius: 100,
    padding: 5
  },
  account: {
    width: '100%'
  },
  labeledInput: {
    minHeight: 90,
    justifyContent: 'space-around',
    marginVertical: 10
  },
  label: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 17,
    textAlign: 'left',
    width: '100%',
  },
  input: {
    width: '100%',

    paddingHorizontal: 20,
    paddingVertical: 10,

    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'rgba(132, 132, 132, .5)'
  },
  options: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '17%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-around'
  },
  optionsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  optionsText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 24,
    width: '70%'
  }
})

export default ConfiguracoesConta