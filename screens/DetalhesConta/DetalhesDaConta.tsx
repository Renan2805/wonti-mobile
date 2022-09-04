import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, Text, StyleSheet, View, Image ,TouchableOpacity, ImageBackground } from 'react-native'
import { RootStackParamList } from '../../types'

import { AntDesign, Entypo } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList>

const DetalhesDaConta = ({ navigation }: Props) => {

  return (
    <ScrollView contentContainerStyle={style.content}>
      <View style={style.fundo}>
        <ImageBackground source={require('../../assets/images/FundoVideo.png')}
        style={style.imagemFundo}
        imageStyle={{borderBottomRightRadius:50,borderBottomLeftRadius:50,}}>
        <View style={style.separarButton}>
          <TouchableOpacity style={style.barra} onPress={() => navigation.navigate('App')}>
             <AntDesign name="arrowleft" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={style.tresPontinhos}>
             <Entypo name="dots-three-vertical" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={style.DivFoto}>
          <View style={style.BarraFoto}>
            <Image source={require('../../assets/images/vh.jpg')}
            style={style.fotoImagem} />
          </View>
        </View>
        <View style={style.DivNome}>
          <Text style={{fontSize:28, marginBottom:3, color:'white'}}>Alana Moreira</Text>
          <Text style={{fontSize:17, color:'white', marginTop:2}}>Desenvolvedora Full-Stack</Text>
        </View>
        </ImageBackground>
        <View style={style.ViewSobre}>
          <Text style={{fontSize:29, fontWeight:'bold'}}>Sobre</Text>
        </View>
        <View style={style.ViewInfo}>
          <ul typeof='list-style-type:circle' style={{width:'100%'}}>
            <li style={{fontSize:21, marginRight:'10%'}}>Cursei Análise e Desenvolvimento de Sistemas pela Bandtec (SPTECH), me formando em 2016.</li>
            <li style={{fontSize:21, marginRight:'10%', marginBottom:10, marginTop:10}}>Trabalhei na Accenture e no Banco Safra</li>
            <li style={{fontSize:21, marginRight:'10%'}}>Meu objetivo é contribuir com as experiencias que obtive ao longo de minha carreira e adquirir mais conhecimento.</li>
          </ul>
        </View>
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    display:'flex'
  },
  ViewSobre: {
    width:'100%',
    margin:10,
    padding:10,
    textAlign:'left'
  },
  ViewInfo: {
    textAlign:'left',
    alignItems:'center',
    display:'flex',
    width:'100%',
    paddingLeft:'8%',
  },
  Lista: {
    width:'100%'
  },
  fundo: {
    display:'flex',
    width:'100%',
    height:350,
    borderBottomRightRadius:50,
    borderBottomLeftRadius:50,
  },
  DivNome: {
    flexDirection:'column',
    width:'100%',
    alignItems:'center',
    padding:2,
    marginTop:3
  },
  barra: {
    width:40,
    height:20
  },
  fotoImagem: {
    width:120,
    height:120,
    borderRadius:100
  },
  DivFoto: {
    width:'100%',
    alignItems:'center',
    display:'flex',
  },
  BarraFoto: {
    padding:4,
    borderWidth:1,
    borderColor:'white',
    borderRadius:100,
    backgroundColor:'white'
  },
  separarButton: {
    width:'100%',
    height:80,
    padding:'5%',
    display:'flex',
    textAlign:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  tresPontinhos: {
    width:13,
    height:20,
    marginTop:7,
    marginLeft:'77%',
  },
  imagemFundo: {
    width:'100%',
    height:'100%',
  }
})

export default DetalhesDaConta