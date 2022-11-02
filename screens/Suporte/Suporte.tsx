import { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, StatusBar, KeyboardAvoidingView, Alert, ScrollView } from 'react-native'
import { ConfigStackScreenProps } from '../../types'
import { ArrowLeft } from 'react-native-iconly'
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Suporte = ({ navigation }: ConfigStackScreenProps<'Suporte'>) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('ConfigScreen')}>
                    <ArrowLeft set={'light'} color={'black'} size={36}/>
                </TouchableOpacity>
                <Text style={styles.title}>Ajuda e suporte</Text>
            </View>
            <View style={styles.viewPrinci}>
                <View style={styles.viewRelatar}>
                    <Text style={{fontSize:24, color:'#FF0356', fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>
                        Relatar um problema
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={styles.viewDenunciar}>
                        <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>Denunciar spam ou abuso</Text>
                    </View>
                    <View style={{width:'100%', height:'auto', flexDirection:'row', marginTop:5}}>
                        <View style={{width:'90%'}}>
                            <Text style={{fontSize:14, color:'#888888'}}>Denuncie contas falsas ou abusos sofridos</Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <FontAwesome5 style={{marginHorizontal:1}}name="angle-right" size={24} color="#7C7C7C" />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={styles.viewDenunciar}>
                        <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>Enviar feedback</Text>
                    </View>
                    <View style={{width:'100%', height:'auto', flexDirection:'row', marginTop:5}}>
                        <View style={{width:'90%'}}>
                            <Text style={{fontSize:14, color:'#888888', fontFamily:'Poppins_700Bold'}}>De sua opnião sobre o aplicativo</Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <FontAwesome5 style={{marginHorizontal:1}}name="angle-right" size={24} color="#7C7C7C" />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={styles.viewDenunciar}>
                        <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>Registrar erros</Text>
                    </View>
                    <View style={{width:'100%', height:'auto', flexDirection:'row', marginTop:5}}>
                        <View style={{width:'90%'}}>
                            <Text style={{fontSize:14, color:'#888888' , fontFamily:'Poppins_700Bold'}}>Relate erros ou bugs encontrados</Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <FontAwesome5 style={{marginHorizontal:1}}name="angle-right" size={24} color="#7C7C7C" />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.viewRelatar}>
                    <Text style={{fontSize:24, color:'#FF0356', fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>
                        Central de ajuda
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={styles.viewDenunciar}>
                        <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>Dúvidas frequentes</Text>
                    </View>
                    <View style={{width:'100%', height:'auto', flexDirection:'row', marginTop:5}}>
                        <View style={{width:'90%'}}>
                            <Text style={{fontSize:14, color:'#888888', fontFamily:'Poppins_700Bold'}}>Veja as principais dúvidas dos usuarios.</Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <FontAwesome5 style={{marginHorizontal:1}}name="angle-right" size={24} color="#7C7C7C" />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.viewRelatar}>
                    <Text style={{fontSize:24, color:'#FF0356', fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>
                        Ajuda
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={styles.viewDenunciar}>
                        <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>Privacidade e segurança</Text>
                    </View>
                    <View style={{width:'100%', height:'auto', flexDirection:'row', marginTop:5}}>
                        <View style={{width:'89.5%'}}>
                            <Text style={{fontSize:14, color:'#888888', fontFamily:'Poppins_700Bold'}}>Instruções de como acessar as funcionalidades do app</Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <FontAwesome5 style={{marginHorizontal:2}}name="angle-right" size={24} color="#7C7C7C" />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.viewRelatar}>
                    <Text style={{fontSize:24, color:'#FF0356', fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>
                        Denúncias
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={{width:'100%', flexDirection:'row'}}>
                        <View style={{width:'90%'}}>
                            <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>Spam</Text>
                        </View>
                        <View style={{width:'10%'}}>
                        <FontAwesome5 style={{marginHorizontal:2}}name="angle-right" size={24} color="#7C7C7C" />
                        </View>
                    </View>
                </TouchableOpacity>
                 <TouchableOpacity style={styles.buttonDenunciar}>
                    <View style={{width:'100%', flexDirection:'row', marginVertical:5}}>
                        <View style={{width:'90%'}}>
                            <Text style={{fontSize:17, fontWeight:'bold', fontFamily:'Poppins_700Bold'}}>Abuso</Text>
                        </View>
                        <View style={{width:'10%'}}>
                        <FontAwesome5 style={{marginHorizontal:2}}name="angle-right" size={24} color="#7C7C7C" />
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
export default Suporte