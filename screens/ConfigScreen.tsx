import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IoMdHeartEmpty, IoIosArrowForward } from 'react-icons/io'
import { ScrollView,Image,Text,StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native'
import { RootStackParamList } from '../types'

type Props = NativeStackScreenProps<RootStackParamList>

const ConfigScreen = ({ navigation }: Props) => {
  return (
    <ScrollView contentContainerStyle={style.content}>
      {/* <View style={{width:'100%', padding:'2rem'}}>
        <Text style={style.TextConta}>Conta</Text>
      </View>
      <View style={{width:'100%',flexDirection:'row', display:'flex', paddingLeft:'2rem'}}>
        <View style={{
         padding:'2rem', 
         width:'9vh',
         height:'9vh',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Alana Moreira</Text>
          <Text style={style.TextDesc}>Informações da conta</Text>
          <View style={{display:'flex', position:'absolute', left:'15rem',top:'2rem'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%', padding:'2rem'}}>
        <Text style={style.TextConta}>Geral</Text>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom:'1rem', display:'flex', paddingLeft:'2rem'}}>
        <View style={{
         padding:'2rem', 
         width:'7vh',
         height:'7vh',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Notificações</Text>
          <View style={{display:'flex', position:'absolute', left:'15rem',top:'1rem'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom:'1rem', display:'flex', paddingLeft:'2rem'}}>
        <View style={{
         padding:'2rem', 
         width:'7vh',
         height:'7vh',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Vagas salvas</Text>
          <View style={{display:'flex', position:'absolute', left:'15rem',top:'1rem'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom:'1rem', display:'flex', paddingLeft:'2rem'}}>
        <View style={{
         padding:'2rem', 
         width:'7vh',
         height:'7vh',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Privacidade</Text>
          <View style={{display:'flex', position:'absolute', left:'15rem',top:'1rem'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom:'1rem', display:'flex', paddingLeft:'2rem'}}>
        <View style={{
         padding:'2rem', 
         width:'7vh',
         height:'7vh',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Segurança</Text>
          <View style={{display:'flex', position:'absolute', left:'15rem',top:'1rem'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom:'1rem', display:'flex', paddingLeft:'2rem'}}>
        <View style={{
         padding:'2rem', 
         width:'7vh',
         height:'7vh',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Ajuda e suporte</Text>
          <View style={{display:'flex', position:'absolute', left:'15rem',top:'1rem'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View><View style={{width:'100%',flexDirection:'row', display:'flex',marginBottom:'2rem', paddingLeft:'2rem'}}>
        <View style={{
         padding:'2rem', 
         width:'7vh',
         height:'7vh',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Sair</Text>
          <View style={{display:'flex', position:'absolute', left:'15rem',top:'1rem'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  )
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
  },
  // TextConta: {
  //   fontSize:30
  // },
  // TextNome: {
  //   fontSize:23,
  //   width:'100%'
  // },
  // TextDesc: {
  //   fontSize:18,
  //   width:'100%'
  // },
  // ButtonView: {
  //   padding:'1rem',
  //   flex:1,
  //   display:'flex',
  // },
  // Flecha: {
  // }
})

export default ConfigScreen