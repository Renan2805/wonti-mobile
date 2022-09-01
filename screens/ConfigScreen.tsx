import { IoMdLock,IoMdHelp } from 'react-icons/io'
import { ScrollView,Image,Text,StyleSheet, View, TouchableOpacity} from 'react-native'
import { RootTabScreenProps } from '../types'

import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const ConfigScreen = ({ navigation }: RootTabScreenProps<'Config'>) => {
  return (
    <ScrollView contentContainerStyle={style.content}>
      <View style={{width:'100%', padding: 32}}>
        <Text style={style.TextConta}>Conta</Text>
      </View>
      <View style={{width:'100%',flexDirection:'row', display:'flex', paddingLeft: 32}}>
        <View style={{
         width: 81,
         height: 80,
         borderRadius:100, 
         borderWidth:1}}>
          <Image 
            source={require('../assets/images/adaptive-icon.png')}
            style={style.Perfil}  
          />
      </View>
        <TouchableOpacity style={style.ButtonView} onPress={() => {navigation.navigate('Detalhes')}}>
          <Text style={style.TextNome}>Alana Moreira</Text>
          <Text style={style.TextDesc}>Informações da conta</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 32}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%', padding: 32}}>
        <Text style={style.TextConta}>Geral</Text>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom: 16, display:'flex', paddingLeft: 32}}>
        <View style={{
         padding: 12, 
         backgroundColor:'#8F00FF26', 
         width: 63,
         height: 63,
         borderRadius:100, 
         }}>
          <Ionicons name="notifications" size={40} color="purple" />
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Notificações</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 16}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom: 16, display:'flex', paddingLeft: 32}}>
        <View style={{
         padding: 12, 
         backgroundColor:'#8F00FF26', 
         alignItems:'center',
         width: 63,
         height: 63,
         borderRadius:100, 
         }}>
          <Ionicons name="bookmark" size={40} color="blue" />
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Vagas salvas</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 16}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom: 16, display:'flex', paddingLeft: 32}}>
        <View style={{
         padding: 12, 
         backgroundColor:'#001AFF26',
         width: 63,
         height:63,
         borderRadius:100, 
         }}>
          <Ionicons name="md-lock-closed" size={40} color="black" />
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Privacidade</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 16}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom: 16, display:'flex', paddingLeft: 32}}>
        <View style={{
         padding: 12, 
         backgroundColor:'#D8F6CE',
         width: 63,
         height: 63,
         borderRadius:100, 
         }}>
          <FontAwesome5 name="shield-alt" size={40} color="green" />
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Segurança</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 16}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{width:'100%',flexDirection:'row',marginBottom: 16, display:'flex', paddingLeft: 32}}>
        <View style={{
         padding: 12, 
         backgroundColor:'#F3E2A9',
         width: 63,
         height: 63,
         borderRadius:100, 
         }}>
          <Ionicons name="md-help" size={40} color="#FF8000" />
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Ajuda e suporte</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 16}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View><View style={{width:'100%',flexDirection:'row', display:'flex',marginBottom: 32, paddingLeft: 32}}>
        <View style={{
         padding: 12, 
         backgroundColor:'#FF7A0026',
         width: 63,
         height: 63,
         borderRadius:100, 
         }}>
          <Entypo name="log-out" size={40} color="red" />
        </View>
        <TouchableOpacity style={style.ButtonView}>
          <Text style={style.TextNome}>Sair</Text>
          <View style={{display:'flex', position:'absolute', left:'75%',top: 16}}>
            <Ionicons name="arrow-forward" size={20} color="black" />
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
  Perfil: {
    width: '100%',
    height: '100%'
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
    padding: 16,
    flex:1,
    display:'flex',
  },
  Flecha: {
  }
})

export default ConfigScreen