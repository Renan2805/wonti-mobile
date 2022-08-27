import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IoMdHeartEmpty, IoIosArrowForward } from 'react-icons/io'
import { ScrollView,Image,Text,StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native'
import { RootStackParamList } from '../types'

type Props = NativeStackScreenProps<RootStackParamList>

const ConfigScreen = ({ navigation }: Props) => {
  return (
    <ScrollView contentContainerStyle={style.content}>
      <View style={{width:'100%', padding:'32px'}}>
        <Text style={style.TextConta}>Conta</Text>
      </View>
      <View style={{width:'100%',flexDirection:'row', display:'flex', paddingLeft:'32px'}}>
        <View style={{
         padding:'32px', 
         width:'81px',
         height:'80px',
         borderRadius:100, 
         borderWidth:1}}>
      </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Alana Moreira</Text>
          <Text style={style.TextDesc}>Informações da conta</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top:'32px'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%', padding:'32px'}}>
        <Text style={style.TextConta}>Geral</Text>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom:'16px', display:'flex', paddingLeft:'32px'}}>
        <View style={{
         padding:'32px', 
         width:'63px',
         height:'63px',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Notificações</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top:'16px'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom:'16px', display:'flex', paddingLeft:'32px'}}>
        <View style={{
         padding:'32px', 
         width:'63px',
         height:'63px',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Vagas salvas</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top:'16px'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom:'16px', display:'flex', paddingLeft:'32px'}}>
        <View style={{
         padding:'32px', 
         width:'63px',
         height:'63px',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Privacidade</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top:'16px'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom:'16px', display:'flex', paddingLeft:'32px'}}>
        <View style={{
         padding:'32px', 
         width:'63px',
         height:'63px',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Segurança</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top:'16px'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom:'16px', display:'flex', paddingLeft:'32px'}}>
        <View style={{
         padding:'32px', 
         width:'63px',
         height:'63px',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Ajuda e suporte</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top:'16px'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View><View style={{width:'100%',flexDirection:'row', display:'flex',marginBottom:'32px', paddingLeft:'32px'}}>
        <View style={{
         padding:'32px', 
         width:'63px',
         height:'63px',
         borderRadius:100, 
         borderWidth:1}}>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Sair</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top:'16px'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
  },
  TextConta: {
    fontSize:30
  },
  TextNome: {
    fontSize:23,
    width:'100%'
  },
  TextDesc: {
    fontSize:18,
    width:'100%'
  },
  ButtonView: {
    padding:'16px',
    flex:1,
    display:'flex',
  },
  Flecha: {
  }
})

export default ConfigScreen