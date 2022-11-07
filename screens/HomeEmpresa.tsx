import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, StatusBar, Alert, Dimensions, TouchableOpacity, TextInput, Modal } from 'react-native'
import * as ExpoStatusBar from 'expo-status-bar'
import CardRecommended from '../components/CardRecommended/CardRecommended'
import SearchBar from '../components/SearchBar/SearchBar'
import { RootTabScreenProps } from '../types'
import { auth, db } from '../config/firebase'
import Loader from '../components/Loader/Loader'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { updateProfile } from 'firebase/auth'
import { collection, query, getDocs, orderBy, limit, getDoc, doc } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons'
import ModalBusca from '../components/ModalBusca/ModalBusca'
import { RootStackScreenProps } from '../types'

const HomeEmpresa = ({ navigation, route }: RootStackScreenProps<'HomeEmpresa'>) => {
    <View style={style.safeView}>
        
    </View>
}
const style = StyleSheet.create({
  safeView :{
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  content: {
    flex: 0,
    width: '100%',
    alignItems: 'center',
    
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
    minWidth: '95%'
  },
  SearchBar: {
    width: '80%',
    minHeight: 25,
    maxHeight: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    borderBottomRightRadius:0,
    borderTopRightRadius:0,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionRecomendados: {
    minWidth: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionPopulares: {
    width: '100%',
    marginHorizontal: 10,
    textAlign:'center',
    alignItems:'center'
  },
  carouselWrapper: {
    width: '100%',
    alignItems: 'center',
  },
})

export default HomeEmpresa