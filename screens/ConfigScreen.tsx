import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BiShieldQuarter, BiLogOut } from "react-icons/bi";
import { IoMdHeartEmpty, IoIosArrowForward, IoMdBookmark, IoIosNotifications, IoMdLock,IoMdHelp } from 'react-icons/io'
import { ScrollView,Image,Text,StyleSheet, View, TouchableOpacity} from 'react-native'
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
         padding:'12px', 
         backgroundColor:'#8F00FF26', 
         width:'63px',
         height:'63px',
         borderRadius:100, 
         }}>
          <IoIosNotifications size={40} color={'purple'}/>
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
         padding:'12px', 
         backgroundColor:'#8F00FF26', 
         alignItems:'center',
         width:'63px',
         height:'63px',
         borderRadius:100, 
         }}>
          <IoMdBookmark size={40} color={'blue'}/>
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
         padding:'12px', 
         backgroundColor:'#001AFF26',
         width:'63px',
         height:'63px',
         borderRadius:100, 
         }}>
          <IoMdLock size={40} color={'#0489B1'}/>
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
         padding:'12px', 
         backgroundColor:'#D8F6CE',
         width:'63px',
         height:'63px',
         borderRadius:100, 
         }}>
          <BiShieldQuarter size={40} color={'green'}/>
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
         padding:'12px', 
         backgroundColor:'#F3E2A9',
         width:'63px',
         height:'63px',
         borderRadius:100, 
         }}>
          <IoMdHelp size={40} color={'#FF8000'}/>
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Ajuda e suporte</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top:'16px'}}>
           <IoIosArrowForward size={20} style={style.Flecha}/>
          </View>
        </TouchableOpacity>
      </View><View style={{width:'100%',flexDirection:'row', display:'flex',marginBottom:'32px', paddingLeft:'32px'}}>
        <View style={{
         padding:'12px', 
         backgroundColor:'#FF7A0026',
         width:'63px',
         height:'63px',
         borderRadius:100, 
         }}>
          <BiLogOut size={40} color={'red'}/>
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
    backgroundColor:'white',
    alignItems: 'center',
  },
  TextConta: {
    fontSize:30,
    fontWeight:'bold'
  },
  TextNome: {
    fontSize:23,
    fontWeight:'bold',
    width:'100%'
  },
  TextDesc: {
    fontSize:18,
    width:'100%'
  },
  imageConfig: {
    width:'100%',
    height:'100%'
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