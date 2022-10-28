import { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, FlatList, ScrollView } from 'react-native'
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

  const renderPage = (page:number) =>{
    if(page === 0) { return (
      <FlatList style={styles.flatList}
              data={[
                {key:  'A Google é feita por pessoas especializadas em desemvolver experiencias de front-end para produtos digitais.'},
                {key: 'A Google é feita por pessoas especializadas em desemvolver experiencias de front-end para produtos digitais.'},
                {key:  'A Google é feita por pessoas especializadas em desemvolver experiencias de front-end para produtos digitais.'},
                {key:  'A Google é feita por pessoas especializadas em desemvolver experiencias de front-end para produtos digitais.'},
              ]}
              
           renderItem={({item, index}) => <Text key={index} style={styles.textFlat}>● {item.key}</Text>} />
      )
}
      else if(page === 1) { return(
      <FlatList style={styles.flatList}
              data={[
                {key: 'Escrever código limpo, de fácil manutenção, utilizando as melhores práticas de desenvolvimento de software;'},
                {key: 'Procurar sempre criar para os produtos Goggle a melhor experiencia de uso para o usuário final, trabalhando de perto com os especialistas em UX;'},
                {key: 'Atuar como um team-player, comprometendo-se em harmonia com todos;'}
              ]}
              
           renderItem={({item, index}) => <Text key={index} style={styles.textFlat}>● {item.key}</Text>} />
      )
  }
     if(page === 2) { return(
      <FlatList style={styles.flatList}
              data={[
                {key: 'Um problema não é realmente resolvido até que seja resolvido para todos.'},
                {key: 'Os Googlers criam produtos que ajudam a criar oportunidades para todos, seja na rua ou em todo o mundo'},
                {key: 'Traga sua visão, imaginação e um saudável desrespeito pelo impossivel'},
                {key: 'Traga tudo o que o torna único, juntos, podemos construir para'},
              ]}
              
           renderItem={({item, index}) => <Text key={index} style={styles.textFlat}>● {item.key}</Text>} />
     )
    } else if(page) {
      return true
    }
  }

  useEffect(() => {
    getJob()
  }, [])

  const testButton = () => {
    alert('Enviado')
  }
  return (
    <View style={styles.content}>
      <ExpoStatusBar.StatusBar translucent={true}/>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <ArrowLeft set={'light'} color={'black'} size={36}/>
        </TouchableOpacity>
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
          <ScrollView style={styles.page}>
            {
              renderPage(page)
            }
          </ScrollView>
          <View style={styles.viewConfirmar}>
            <TouchableOpacity style={styles.buttonConfirmar} onPress={() => testButton()}>
              <Text style={{fontSize:20,  color: 'white' }}>Enviar curriculo</Text>
            </TouchableOpacity>
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
  buttonConfirmar: {
    width:'80%',
    padding:8,
    height:50,
    position:'absolute',
    backgroundColor: '#FF0356',
    borderRadius:25,
  },
  viewConfirmar: {
    width:'100%',
    padding:5,
    height:110,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center'
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
    backgroundColor: 'black',
    marginTop:8
  },
  pages: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop:10
  },
  pageButton: {
    backgroundColor: 'rgba(0, 0, 0, .05)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  pageText: {
    fontFamily: 'Poppins_300Light',

  },
  flatList: {
    paddingHorizontal:8,
   
  },
  textFlat: {
    fontSize:16,
    marginVertical:6,
    textAlign:"justify"
  },
  page: {
    width: '100%',
    padding:20
  }
})


export default JobDetail