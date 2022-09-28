import { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import { db, storage } from '../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { Job, VagasStackScreenProps } from '../../types'
import { ArrowLeft } from 'react-native-iconly'
import { Entypo } from '@expo/vector-icons';

const JobDetail = ({ navigation, route }: VagasStackScreenProps<'Job'>) => {
  
  const id = route.params.id
  
  const [job, setJob] = useState<Job>()
  const [imageUrl, setImageUrl] = useState<string>()

  const [page, setPage] = useState<number>(0)

  const getImage = async (uid: string) => {
    const storageRef = ref(storage, `Users/${uid}/Profile`)
    await getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url)
      },
      () => {

      })
  }

  const getJob = async () => {
    const docRef = doc(db, `Jobs/${id}`)
    await getDoc(docRef)
      .then((snapshot) => {
        if(snapshot.exists()) {
          // @ts-ignore
          setJob(snapshot.data())
          getImage(snapshot.data().HirerUid)
        }
      })
      .catch(e => console.error(e))
  }

  const renderPage = () =>{
    const teste = [
      'fodase',
      'cu',
      'caralho'
    ]

    if(page === 0) return teste.map((teste, index) => (
      <Text key={index}>{teste}</Text>
    ))
  }

  useEffect(() => {
    getJob()
  }, [])

  return (
    <View style={styles.content}>
      <ExpoStatusBar.StatusBar translucent={true}/>
      <View style={styles.header}>
        <ArrowLeft set={'light'} color={'black'} size={36} onPress={() => navigation.goBack()}/>
        <Text style={styles.title}>Detalhes da vaga</Text>
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </View>
      <View style={styles.info}>
        <View style={styles.section1}>
          <Image 
            source={{uri: imageUrl}}
            style={styles.image}
          />
          <Text style={[styles.title, {fontSize: 28, textAlign: 'center'}]}>
            {job?.Title + '\n'}
            <Text style={styles.text}>{`${job?.Hirer}, ${job?.Place}`}</Text>
          </Text>
        </View>
        <View style={styles.divider}/>
        <View style={styles.section2}>
          <View style={styles.pages}>
            <TouchableOpacity 
              style={[styles.pageButton, page === 0 && {backgroundColor: 'black'}]}
              onPress={() => setPage(0)}
            >
              <Text style={[styles.pageText, page === 0 && {color: 'white'}]}>Descrição da vaga</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.pageButton, page === 1 && {backgroundColor: 'black'}]}
              onPress={() => setPage(1)}  
            >
              <Text style={[styles.pageText, page === 1 && {color: 'white'}]}>Requisitos</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.pageButton, page === 2 && {backgroundColor: 'black'}]}
              onPress={() => setPage(2)}
            >
              <Text style={[styles.pageText, page === 2 && {color: 'white'}]}>Empresa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.page}>
            {
              renderPage()
            }
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: StatusBar.currentHeight,
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '90%',
  },
  info: {
    width: '100%',
    alignItems: 'center'
  },
  section1: {
    alignItems: 'center'
  },
  section2: {
    width: '100%',
    alignItems: 'center'
  },
  image: {
    height: 100,
    aspectRatio: 1,
    borderRadius: 10
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16
  },
  divider: {
    width: '90%',
    height: .5,
    backgroundColor: 'black'
  },
  pages: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%'
  },
  pageButton: {
    backgroundColor: 'rgba(0, 0, 0, .05)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20
  },
  pageText: {
    fontFamily: 'Poppins_300Light'
  },
  page: {
    width: '100%'
  }
})


export default JobDetail