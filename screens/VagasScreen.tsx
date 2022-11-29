import { Job, RootStackScreenProps } from '../types'
import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, StatusBar, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import CardRecommended from '../components/CardRecommended/CardRecommended'
import { auth, db } from '../config/firebase'
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import Loader from '../components/Loader/Loader'
import { Search, Filter } from "react-native-iconly"
import { getData, storeData } from '../hooks/useAsyncStorage'
import VagasEmpresa from './VagasEmpresa'
import { User } from '../types'

const VagasScreen = ({ navigation }: RootStackScreenProps<'Vagas'>) => {

  const [user, setUser] = useState(auth.currentUser)
  const [userData, setUserData] = useState<User>()
  const [isUser, setIsUser] = useState<boolean>()
  const [vagas, setVagas] = useState<string[]>()
  const [isLoading, setIsLoading] = useState(true)

  const [count, setCount] = useState(0)

  const getJobs = async () => {
    let jobs: string[] = []
    await getDocs(collection(db, 'Jobs'))
      .then((snapshot) => {
        snapshot.forEach(doc => {
          jobs = [...jobs, doc.id]
        })
      })
      .catch(e => console.error('getJobs Error: ', e))
      .finally(() => {
        setVagas(jobs)
      })
    
  }

  const getUserData = async () => {
    const data = await getData('user_data')
    if(data) {
      const json = await JSON.parse(data)
      setUserData(json)
      setIsUser(json.isUser)
    } 
  }

  useEffect(() => {
    setIsLoading(true)
    getUserData()
    getJobs().then(() => setIsLoading(false)).catch(e => console.error(e)).finally(() => {
      setCount(count + 1)
    })
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
    })

  }, [])

  const SearchBar = () => {
    return (
      <View style={style.searchBar}>
        <View style={style.search}>
          <Search set={'light'} size={'medium'} color={'black'}/>
          <TextInput 
            style={style.input} 
            placeholder={'Procurar Vagas'}
          />
        </View>
        <TouchableOpacity style={style.filter}>
          <Filter set={'bold'} size={'medium'} color={'white'}/>
        </TouchableOpacity>
      </View>
    )
  }

  if(!isLoading && isUser == true)
  return (
    <SafeAreaView style={style.safeView}>
      <View style={{padding:20, alignItems:'center'}}>
        <Text style={{fontSize:25, fontWeight:'bold'}}>Procurar vagas</Text>
      </View>
      <ExpoStatusBar.StatusBar/>
      <ScrollView contentContainerStyle={style.content} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true} >
        <View style={{width: '100%', alignItems: 'center'}}>
          <SearchBar />
        </View>
        {/*<Text>{user?.uid}</Text>*/}
        <View style={style.cardWrapper}>
          {
            vagas?.map((job, index) => (
              <CardRecommended 
                key={index}
                jobId={job}
                theme={false}
                full={false}
                _style={{marginVertical: 10}}
              />
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
  else if(!isLoading && isUser == false) return (
    <VagasEmpresa />
  ) 
  else return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}

const style = StyleSheet.create({
  safeView :{
    paddingTop: StatusBar.currentHeight,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  content: {
    width: '100%',
    alignItems: 'center'
  },
  cardWrapper: {
    width: '100%',
    paddingHorizontal: 20
  },
  searchBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  search: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    width: '85%'
  },
  input: {
    width: '80%'
  },
  filter: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
  }

})

export default VagasScreen