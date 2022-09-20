import { Job, RootStackScreenProps } from '../types'
import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import CardRecommended from '../components/CardRecommended/CardRecommended'
import SearchBar from '../components/SearchBar/SearchBar'
import { auth, db } from '../config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import Loader from '../components/Loader/Loader'

const VagasScreen = ({ navigation }: RootStackScreenProps<'Vagas'>) => {

  const [user, setUser] = useState(auth.currentUser)
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
        console.log('Jobs: ', jobs)
        setVagas(jobs)
      })
    
  }

  useEffect(() => {
    if(user === null) {
      setIsLoading(true)
    }
    getJobs().then(() => setIsLoading(false)).catch(e => console.error(e)).finally(() => {
      setCount(count + 1)
      console.log('Loops: ', count)
    })
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
    })

  }, [])
  if(!isLoading)
  return (
    <SafeAreaView style={style.safeView}>
      <View style={{flex:1, padding:20, alignItems:'center', marginBottom:30}}>
        <Text style={{fontSize:25, fontWeight:'bold'}}>Procurar vagas</Text>
      </View>
      <ExpoStatusBar.StatusBar translucent={true}/>
      <ScrollView contentContainerStyle={style.content} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true} >
        <View style={{width: '100%', alignItems: 'center'}}>
          <SearchBar _onPressS={function (): void {
              throw new Error('Function not implemented.')
            } } _onPressF={function (): void {
              throw new Error('Function not implemented.')
            } } _onChangeText={function (text: string): void {
              throw new Error('Function not implemented.')
            } } />
        </View>
        {/*<Text>{user?.uid}</Text>*/}
        <View style={style.cardWrapper}>
          {
            vagas?.map((job, index) => (
              <CardRecommended 
                key={index}
                jobId={job}
                theme={false}
                full={true}
                _style={{marginVertical: 10}}
              />
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
  else return (
    <Loader />
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
    width: '80%'
  }
})

export default VagasScreen