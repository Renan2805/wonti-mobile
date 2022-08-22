import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { RootStackParamList } from '../../types'
import { Bookmark, People, Location, TimeCircle } from 'react-native-iconly'
import { useState } from 'react'


type CardProps<RootStackParamList> = {
  navigation?: RootStackParamList
  theme: boolean 
  image: string
  title: string
  hirer: string
  description: string
  time: string
  type: string
  salary: number
  competitors: number
  place: string
  posted: number
}

type Props = CardProps<'CardRecom'>

const CardRecommended = ({ 
    navigation, 
    theme, 
    image,
    title,
    hirer,
    description,
    time,
    type,
    salary,
    competitors,
    place,
    posted,

  }: Props) => {

  const [saved, setSaved] = useState(true)

  const primaryColor = theme ? '#FFF': '#000'

  return (
    <View style={[style.card, { backgroundColor: theme ? '#000' : '#FFF'}]}>
      <View style={style.section1}>
        <Image 
          source={{uri: 'https://logopng.com.br/logos/google-37.png'}}
          style={style.image}  
        />
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', paddingHorizontal: 10}}>
          <Text style={[style.title, {color: theme? '#FFF' : '#000'}]}>{title}</Text>
          <Text style={[style.hirer, {color: theme? '#FFF' : '#000'}]}>{hirer}</Text>
        </View>
        <TouchableOpacity onPress={() => {
            setSaved(!saved)
            console.log(saved);
          }}>
          <Bookmark size={'medium'} set={saved ? 'bold' : 'light'} primaryColor={primaryColor} />
        </TouchableOpacity>
      </View>
      <View style={style.section2}>
        <Text style={[style.description, {color: theme? '#FFF' : '#000'}]}>{description}</Text>
      </View>
      <View style={style.section3}>
        <View style={{
          backgroundColor: theme ? 'rgba(255, 255, 255, 0.12)' : 'rgba(152, 152, 152, 0.12)',
          width: '30%',
          borderRadius: 2,
          justifyContent: 'center'
        }}>
          <Text style={style.info}>{time}</Text>
        </View>
        <View style={{
          backgroundColor: theme ? 'rgba(255, 255, 255, 0.12)' : 'rgba(152, 152, 152, 0.12)',
          width: '30%',
          borderRadius: 2,
          justifyContent: 'center'
        }}>
          <Text style={style.info}>{type}</Text>
        </View>
        <View style={{
          backgroundColor: theme ? 'rgba(255, 255, 255, 0.12)' : 'rgba(152, 152, 152, 0.12)',
          width: '30%',
          borderRadius: 2,
          justifyContent: 'center'
        }}>
          <Text style={style.info}>{salary}</Text>
        </View>
      </View>
      <View style={[style.divider, { backgroundColor: theme ? 'rgba(255, 255, 255, 0.12)' : 'rgba(152, 152, 152, 0.12)' }]}></View>
      <View style={style.section4}>
        <View style={{ width: '20%', flexDirection: 'row', justifyContent: 'center'}}>
          <People set={'light'} primaryColor={primaryColor}/>
          <Text>{competitors}</Text>
        </View>
        <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'center'}}>
          <Location set={'light'} primaryColor={primaryColor}/>
          <Text>{place}</Text>
        </View>
        <View style={{ width: '20%', flexDirection: 'row', justifyContent: 'center'}}>
          <TimeCircle set={'light'} primaryColor={primaryColor}/>
          <Text>{posted}</Text>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  card: {
    width: '80%',
    minHeight: 60,
    padding: 15,
    borderRadius: 15
  },
  section1: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40
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
    width: '100%'
  },
  description: {
    fontFamily: 'WorkSans_400Regular',
    fontSize: 17,
    textAlign: 'center',
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
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 10
  },
  section4: {
    width: '100%',
    flex: 1,
    flexDirection: 'row'
  }
})

export default CardRecommended