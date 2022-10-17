import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native'
import { Bookmark, People, Location, TimeCircle, Wallet } from 'react-native-iconly'
import { useNavigation } from '@react-navigation/native'
import Loader from '../Loader/Loader'
import { db, storage, auth } from '../../config/firebase'
import { arrayRemove, arrayUnion, doc, DocumentData, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'

type Props = {
  theme: boolean
  full: boolean
  jobId: string
  _style?: ViewStyle
  
}

const CardRecommended = ({ 
    theme,
    full,
    jobId,
    _style,
  }: Props) => {

  type Job = {
    Hirer: string,
    HirerUid: string,
    Title: string,
    Description: string,
    Time: string,
    Type: string,
    Competitors: number,
    Place: string,
    Salary: number,
    Posted: number
  }

  const navigation = useNavigation()

  const [saved, setSaved] = useState(false)
  const [image, setImage] = useState<string>()
  const [data, setData] = useState<Job>()
  const [vagas, setVagas] = useState<string[]>()
  const [id, setId] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)

  const primaryColor   = theme ? '#FFF' : '#000'
  const secondaryColor = theme ? '#000' : '#FFF'
  
  const getData = async () => {
    try {
      // Fetch all job data out of the jobId given in the props
      const docRef = doc(db, `Jobs/${jobId}`)
      onSnapshot(docRef, (doc) => {
        if(doc.exists()) {
          // @ts-ignore
          setData(doc.data())
          getImage(doc.data().HirerUid)
          setId(doc.id)
          getVagas()
          

          setIsLoading(false)
        }
      })
    } catch(e) {
      console.log(e)
    }
  }

  const getImage = async (uid: string) => {
    // Fetch the profile image url of the hirer
    setIsLoading(true)
    const url = await getDownloadURL(ref(storage, `Users/${uid}/Profile`))
    setImage(url)
  }

  const getVagas = async () => {
    // @ts-ignore
    const ref = doc(db, `Users/${auth.currentUser.uid}`)
    await getDoc(ref)
    .then(snapshot => {
      if(snapshot.exists()) {
        setVagas(snapshot.data().Vagas_Salvas)
        checkSaved(id)
      }
    })
    .catch(e => console.error(e))
  }

  const toggleSave = async (uid: string) => {
    const r = doc(db, `Users/${uid}`)
    await updateDoc(r, {
      Vagas_Salvas: saved ? arrayRemove(id) : arrayUnion(id)
    })
    checkSaved(id)
  }

  const checkSaved = async (id: string) => {
    if(vagas?.includes(id)) setSaved(true)
    else setSaved(false)
  }

  useEffect(() => {
    getData()
  }, [])


  if(!isLoading && data)
  return (
    // @ts-ignore
    <TouchableOpacity style={[_style, style.card, { backgroundColor: secondaryColor}]} onPress={() => navigation.navigate('Job', {id: id})}>
      <View style={style.section1}>
        <Image 
          style={style.image}
          source={image != undefined ? {uri: image} : require('../../assets/images/DefaultProfile.png')}
        />
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', paddingHorizontal: 10}}>
          <Text style={[style.title, {color: primaryColor}]}>{data.Title}</Text>
          <Text style={[style.hirer, {color: primaryColor}]}>{data.Hirer}</Text>
        </View>
        <TouchableOpacity onPress={() => {
            toggleSave(data.HirerUid)
          }}
          style={{alignSelf: 'flex-start'}}
        >
          <Bookmark size={'medium'} set={saved ? 'bold' : 'light'} primaryColor={primaryColor} />
        </TouchableOpacity>
      </View>
      {
        full && 
        <>
          <View style={style.section2}>
            <Text style={[style.description, {color: primaryColor}]}>{data.Description}</Text>
          </View>
          <View style={style.section3}>
            <View style={{
              backgroundColor: theme ? 'rgba(255, 255, 255, 0.12)' : 'rgba(152, 152, 152, 0.12)',
              width: '30%',
              borderRadius: 2,
              justifyContent: 'center'
            }}>
              <Text style={[style.info, {color: primaryColor}]}>{data.Time}</Text>
            </View>
            <View style={{
              backgroundColor: theme ? 'rgba(255, 255, 255, 0.12)' : 'rgba(152, 152, 152, 0.12)',
              width: '30%',
              borderRadius: 2,
              justifyContent: 'center'
            }}>
              <Text style={[style.info, {color: primaryColor}]}>{data.Type}</Text>
            </View>
            <View style={{
              backgroundColor: theme ? 'rgba(255, 255, 255, 0.12)' : 'rgba(152, 152, 152, 0.12)',
              width: '30%',
              borderRadius: 2,
              justifyContent: 'center'
            }}>
              <Text style={[style.info, {color: primaryColor}]}>{'R$' + data.Salary}</Text>
            </View>
          </View>
        </>
      }
      <View style={[style.divider, { backgroundColor: theme ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.22)' }]}></View>
      <View style={style.section4}>
         <View style={{ width: '27.5%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
           <People set={'light'} primaryColor={theme ? '#C4C4C4':'#000'}/>
           <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, color: theme ? '#C4C4C4':'#000'}}>{data.Competitors}</Text>
         </View>
         {
           full ?
            <>
               <View style={{ width: '45%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                 <Location set={'light'} primaryColor={theme ? '#C4C4C4':'#000'}/>
                 <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, color: theme ? '#C4C4C4':'#000'}}>{data.Place}</Text>
               </View>
             </>
           :
             <>
               <View style={{ width: '45%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                 <Wallet set={'light'} primaryColor={theme ? '#C4C4C4':'#000'}/>
                 <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, color: theme ? '#C4C4C4':'#000'}}>{'R$' + data.Salary}</Text>
               </View>
             </>

         }
        
         <View style={{ width: '27.5%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
           <TimeCircle set={'light'} primaryColor={theme ? '#C4C4C4':'#000'}/>
           <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, color: theme ? '#C4C4C4':'#000'}}>{data.Posted + ' Dias'}</Text>
         </View> 
       </View>
    </TouchableOpacity>
  )
  else return (
    <Loader />
  )
}

const style = StyleSheet.create({
  card: {
    width: '100%',
    padding: 15,
    borderRadius: 15,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity:  1,
    shadowRadius: 2,
    elevation: 8
  },
  section1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 19,
    lineHeight: 25
  },
  hirer: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },
  section2: {
    width: '100%',
  },
  description: {
    fontFamily: 'WorkSans_400Regular',
    fontSize: 17,
    marginVertical: 10
  },
  section3: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info: {
    width: '100%',
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 5
  },
  divider: {
    minWidth: '100%',
    height: 1,
    marginVertical: 10
  },
  section4: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  }
})

export default CardRecommended