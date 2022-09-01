import { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Bookmark, People, Location, TimeCircle, Wallet } from 'react-native-iconly'
import { useNavigation } from '@react-navigation/native'

type Props = {
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
  full: boolean
}

const CardRecommended = ({ 
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
    full
  }: Props) => {

  const [saved, setSaved] = useState(true)

  const navigation = useNavigation()

  const primaryColor   = theme ? '#FFF' : '#000'
  const secondaryColor = theme ? '#000' : '#FFF'

  return (
    <View style={[style.card, { backgroundColor: secondaryColor, height: full ? 200 : 120}]}>
      <TouchableOpacity style={style.section1} onPress={() => navigation.navigate('LoginScreen')}>
          <Image 
            source={{uri: image}}
            style={style.image}  
          />
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', paddingHorizontal: 10}}>
            <Text style={[style.title, {color: primaryColor}]}>{title}</Text>
            <Text style={[style.hirer, {color: primaryColor}]}>{hirer}</Text>
          </View>
          <TouchableOpacity onPress={() => {
              setSaved(!saved)
              console.log('Saved: ',saved);
            }}>
            <Bookmark size={'medium'} set={saved ? 'bold' : 'light'} primaryColor={primaryColor} />
          </TouchableOpacity>
      </TouchableOpacity>
      {
        full ? 
        <>
          <View style={style.section2}>
            <Text style={[style.description, {color: primaryColor}]}>{description}</Text>
          </View>
          <View style={style.section3}>
            <View style={{
              backgroundColor: theme ? 'rgba(255, 255, 255, 0.12)' : 'rgba(152, 152, 152, 0.12)',
              width: '30%',
              borderRadius: 2,
              justifyContent: 'center'
            }}>
              <Text style={[style.info, {color: primaryColor}]}>{time}</Text>
            </View>
            <View style={{
              backgroundColor: theme ? 'rgba(255, 255, 255, 0.12)' : 'rgba(152, 152, 152, 0.12)',
              width: '30%',
              borderRadius: 2,
              justifyContent: 'center'
            }}>
              <Text style={[style.info, {color: primaryColor}]}>{type}</Text>
            </View>
            <View style={{
              backgroundColor: theme ? 'rgba(255, 255, 255, 0.12)' : 'rgba(152, 152, 152, 0.12)',
              width: '30%',
              borderRadius: 2,
              justifyContent: 'center'
            }}>
              <Text style={[style.info, {color: primaryColor}]}>{'R$' + salary}</Text>
            </View>
          </View>
        </>:<></>
        }
      <View style={[style.divider, { backgroundColor: theme ? 'rgba(255, 255, 255, 0.12)' : 'rgba(152, 152, 152, 0.12)' }]}></View>
      <View style={style.section4}>
        <View style={{ width: '27.5%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <People set={'light'} primaryColor={theme ? '#C4C4C4':'#000'}/>
          <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, color: theme ? '#C4C4C4':'#000'}}>{competitors}</Text>
        </View>
        {
          full ?
            <>
              <View style={{ width: '45%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Location set={'light'} primaryColor={theme ? '#C4C4C4':'#000'}/>
                <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, color: theme ? '#C4C4C4':'#000'}}>{place}</Text>
              </View>
            </>
          :
            <>
              <View style={{ width: '45%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Wallet set={'light'} primaryColor={theme ? '#C4C4C4':'#000'}/>
                <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, color: theme ? '#C4C4C4':'#000'}}>{'R$' + salary}</Text>
              </View>
            </>

        }
        
        <View style={{ width: '27.5%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <TimeCircle set={'light'} primaryColor={theme ? '#C4C4C4':'#000'}/>
          <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14, color: theme ? '#C4C4C4':'#000'}}>{posted + ' Dias'}</Text>
        </View> 
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  card: {
    width: '85%',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10
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
    height: 40,
    borderRadius: 5
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