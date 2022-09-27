import { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import { db, storage } from '../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { Job, VagasStackScreenProps } from '../../types'

const JobDetail = ({ navigation, route }: VagasStackScreenProps<'Job'>) => {
  
  const id = route.params.id
  
  const [job, setJob] = useState<Job>()

  const getImage = async () => {
    const storageRef = ref(storage, `Users/${job?.HirerUid}/Profile`)
    await getDownloadURL(storageRef)
      .then(() => {
        
      })
  }

  const getJob = async () => {
    const docRef = doc(db, `Jobs/${id}`)
    await getDoc(docRef)
      .then((snapshot) => {
        if(snapshot.exists()) {
          // @ts-ignore
          setJob(snapshot.data())
        }
      })
      .catch(e => console.error(e))
  }

  useEffect(() => {
    getJob()
  }, [])

  return (
    <View style={styles.content}>
      <Text>{JSON.stringify(job)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: StatusBar.currentHeight
  }
})


export default JobDetail