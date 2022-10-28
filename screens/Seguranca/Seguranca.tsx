import { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, StatusBar, KeyboardAvoidingView, Alert, ScrollView } from 'react-native'
import { ConfigStackScreenProps } from '../../types'
import { ArrowLeft } from 'react-native-iconly'
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native'

const Seguranca = ({ navigation, route }: ConfigStackScreenProps<'Seguranca'>) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('ConfigScreen')}>
                    <ArrowLeft set={'light'} color={'black'} size={36}/>
                </TouchableOpacity>
                <Text style={styles.title}>Segurança</Text>
            </View>
            <View style={styles.viewPrinci}>
                <View style={styles.viewRelatar}>
                    <Text style={{fontSize:24, color:'#FF0356', fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>
                        Recuperar Conta 
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={styles.viewDenunciar}>
                        <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>E-mail para recuperação</Text>
                    </View>
                    <View style={{width:'100%', height:'auto', flexDirection:'row', marginTop:5}}>
                        <View style={{width:'90%'}}>
                            <Text style={{fontSize:14, color:'#888888'}}>alana-mor62@yahoo.com.br</Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <FontAwesome5 style={{marginHorizontal:1}}name="angle-right" size={24} color="#7C7C7C" />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={styles.viewDenunciar}>
                        <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>Celular para recuperação</Text>
                    </View>
                    <View style={{width:'100%', height:'auto', flexDirection:'row', marginTop:5}}>
                        <View style={{width:'90%'}}>
                            <Text style={{fontSize:14, color:'#888888', fontFamily:'Poppins_700Bold'}}>(11) 99496-0530</Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <FontAwesome5 style={{marginHorizontal:1}}name="angle-right" size={24} color="#7C7C7C" />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.viewRelatar}>
                    <Text style={{fontSize:24, color:'#FF0356', fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>
                        Login
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={styles.viewDenunciar}>
                        <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>Alterar senha</Text>
                    </View>
                    <View style={{width:'100%', height:'auto', flexDirection:'row', marginTop:5}}>
                        <View style={{width:'90%'}}>
                            <Text style={{fontSize:14, color:'#888888', fontFamily:'Poppins_700Bold', width:'90%'}}>Mudar sua senha</Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <FontAwesome5 style={{marginHorizontal:1}}name="angle-right" size={24} color="#7C7C7C" />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={styles.viewDenunciar}>
                        <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>Salvar informações de conta</Text>
                    </View>
                    <View style={{width:'100%', height:'auto', flexDirection:'row', marginTop:5}}>
                        <View style={{width:'90%'}}>
                            <Text style={{fontSize:14, color:'#888888', fontFamily:'Poppins_700Bold', width:'90%'}}>Suas informações ficaram salvas mesmo depois de sair da conta</Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <FontAwesome5 style={{marginHorizontal:1}}name="angle-right" size={24} color="#7C7C7C" />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.viewRelatar}>
                    <Text style={{fontSize:24, color:'#FF0356', fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>
                        Verificação
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={styles.viewDenunciar}>
                        <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>Duas etapas</Text>
                    </View>
                    <View style={{width:'100%', height:'auto', flexDirection:'row', marginTop:5}}>
                        <View style={{width:'89.5%'}}>
                            <Text style={{fontSize:14, color:'#888888', fontFamily:'Poppins_700Bold'}}>Ao logar enviaremos um código para confirmar sua identidade</Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <FontAwesome5 style={{marginHorizontal:2}}name="angle-right" size={24} color="#7C7C7C" />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.viewRelatar}>
                    <Text style={{fontSize:24, color:'#FF0356', fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>
                        Extra
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={styles.viewDenunciar}>
                        <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>Receber emails</Text>
                    </View>
                    <View style={{width:'100%', height:'auto', flexDirection:'row', marginTop:5}}>
                        <View style={{width:'89.5%'}}>
                            <Text style={{fontSize:14, color:'#888888', fontFamily:'Poppins_700Bold', width:'90%'}}>Se ativado voce receberá emails de logins desconhecidos</Text>
                        </View>
                        <View style={{width:'10%'}}>
                        {/* <ToggleSwitch
                            isOn={false}
                            onColor="green"
                            offColor="red"
                            label="Example label"
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="large"
                            onToggle={isOn => console.log("changed to : ", isOn)}
                            /> */}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        minHeight: '100%',
        backgroundColor:'white',
    },
    header: {
        flexDirection:'row',
        width:'100%',
        marginVertical:15,
        marginHorizontal:10
    },
    viewPrinci: {
        flexDirection:'column',
        width:'100%',
        height:'auto',
        padding:25,
    },
    viewRelatar: {
        width:'100%',
        marginTop:15,
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 24,
        textAlign:'center',
        marginHorizontal:'15%'
    },
    buttonDenunciar: {
        width:'100%',
     marginTop:15
    },
    viewDenunciar: {

    }
})
export default Seguranca