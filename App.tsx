import React, { useEffect, useState } from 'react'
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from './screens/FirstAccess/IntroScreen';
import FirstScreen from './screens/FirstAccess/FirstScreen';
import { onAuthStateChanged } from 'firebase/auth'

import LoginScreen from './screens/LoginScreens/LoginScreen';

// Fonts
import * as Font from 'expo-font';
import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black
} from '@expo-google-fonts/montserrat'

import {
  WorkSans_100Thin,
  WorkSans_200ExtraLight,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
  WorkSans_800ExtraBold,
  WorkSans_900Black
} from '@expo-google-fonts/work-sans'

import { 
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins'

import { Numans_400Regular } from '@expo-google-fonts/numans'

import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ConfigStackParamList, RootStackParamList, RootTabParamList, HomeStackScreenProps, HomeStackparamList, VagasStackParamList, User } from './types';
import { Home, Work, Setting } from 'react-native-iconly';
import Loader from './components/Loader/Loader';
import { auth, db } from './config/firebase';

import HomeScreen from './screens/HomeScreen';
import ConfigScreen from './screens/ConfigScreen';
import VagasScreen from './screens/VagasScreen';

import SignIn_1 from './screens/SignInScreens/SignIn_1';
import SignIn_2 from './screens/SignInScreens/Hirer/SignIn_2';
import * as SignInCandidate from './screens/SignInScreens/Candidate'
import DetalhesDaConta from './screens/DetalhesConta/DetalhesDaConta';
import RecoverPasswordScreen from './screens/RecoverPasswordScreen/RecoverPasswordScreen';
import ConfiguracoesConta from './screens/ConfiguracoesConta/ConfiguracoesConta';
import { JobDetail } from './screens/JobDetail';
import SignIn_3 from './screens/SignInScreens/Hirer/SignIn_3';
import SignIn_4 from './screens/SignInScreens/Hirer/SignIn_4';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { storeData } from './hooks/useAsyncStorage';
import Criar, { Criar_2 } from './screens/Criar/Criar';

// import Suporte from './screens/Suporte/Suporte';
// import Seguranca from './screens/Seguranca/Seguranca';

export default function App() {

  const [fontsLoaded] = Font.useFonts({
      Montserrat_100Thin,
      Montserrat_200ExtraLight,
      Montserrat_300Light,
      Montserrat_400Regular,
      Montserrat_500Medium,
      Montserrat_600SemiBold,
      Montserrat_700Bold,
      Montserrat_800ExtraBold,
      Montserrat_900Black,
  
      WorkSans_100Thin,
      WorkSans_200ExtraLight,
      WorkSans_300Light,
      WorkSans_400Regular,
      WorkSans_500Medium,
      WorkSans_600SemiBold,
      WorkSans_700Bold,
      WorkSans_800ExtraBold,
      WorkSans_900Black,

      Poppins_100Thin,
      Poppins_200ExtraLight,
      Poppins_300Light,
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold,
      Poppins_800ExtraBold,
      Poppins_900Black,

      Numans_400Regular
  })

  const [isLoading, setIsLoading] = useState(true)

  const [logged, setLogged] = useState(false)

  const Stack = createNativeStackNavigator<RootStackParamList>()
  const BottomTab = createBottomTabNavigator<RootTabParamList>()

  const getUserData = async (userUid: string) => {
    try {
      const docRef = doc(db, `Users/${userUid}`)
      onSnapshot(docRef, (doc) => {
        if(doc.exists()) {
          // @ts-ignore
          storeData('user_data', JSON.stringify(doc.data()))
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // @ts-ignore
        getUserData(user.uid)
        setLogged(true)
        setIsLoading(false)
      } else {
        setLogged(false)
        setIsLoading(false)
      }
    })
  }, [])

  if(fontsLoaded && !isLoading) return (
    <NavigationContainer>
      <StatusBar style="dark" translucent={true}/>
      {
        logged 
        ?
        <BottomTab.Navigator
          initialRouteName="HomeTab"
          screenOptions={{
            tabBarActiveTintColor: '#FF0356',
            tabBarInactiveTintColor: '#000000',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'white',
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              height: 70
            },
            tabBarHideOnKeyboard: true
            
          }}
        >
        
          <BottomTab.Screen
            name="HomeTab"
            component={HomeStack}
            options={() => ({
              tabBarIcon: ({ color, focused }) => focused ? <Home primaryColor={color} set="bold" size={'large'}/> : <Home primaryColor={color} size={'large'}/>,
            })}
          />
          <BottomTab.Screen
            name="VagasTab"
            component={VagasStack}
            options={() => ({
              tabBarIcon: ({ color, focused }) => focused ? <Work primaryColor={color} set="bold" size={'large'}/> : <Work primaryColor={color} size={'large'}/>,
            })}
          />
          <BottomTab.Screen
            name="Config"
            component={ConfigStack}
            options={() => ({
              tabBarIcon: ({ color, focused }) => focused ? <Setting primaryColor={color} set="bold" size={'large'}/> : <Setting primaryColor={color} size={'large'}/>,
            })}
          />
        </BottomTab.Navigator>
        :
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}
        >
          <Stack.Screen name={'First'} component={FirstScreen} />
          <Stack.Screen name={'Intro'} component={IntroScreen} />
          <Stack.Screen name={'LoginScreen'} component={LoginScreen}/> 
          <Stack.Screen name={'RecoverPasswordScreen'} component={RecoverPasswordScreen}/> 
          <Stack.Group>
            <Stack.Screen name={'SignIn_1'} component={SignIn_1}/>
            
            {/* Telas cadastro pessoa */}
            <Stack.Screen name={'SignIn_2c'} component={SignInCandidate.SignIn_2}/>
            <Stack.Screen name={'SignIn_5c'} component={SignInCandidate.SignIn_5}/>
            <Stack.Screen name={'SignIn_6c'} component={SignInCandidate.SignIn_6}/>
            <Stack.Screen name={'SignIn_7c'} component={SignInCandidate.SignIn_7}/>
            <Stack.Screen name={'SignIn_8c'} component={SignInCandidate.SignIn_8}/>
            <Stack.Screen name={'SignIn_9c'} component={SignInCandidate.SignIn_9}/>
            
            {/* Telas cadastro de empresa */}
            <Stack.Screen name={'SignIn_2e'} component={SignIn_2}/>
            <Stack.Screen name={'SignIn_3e'} component={SignIn_3}/>
            <Stack.Screen name={'SignIn_4e'} component={SignIn_4}/>

          </Stack.Group>
        </Stack.Navigator>
      }
    </NavigationContainer>
  )
  else return (
    <Loader />
  )
}

const ConfigStack = () => {
  const Stack = createNativeStackNavigator<ConfigStackParamList>()

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'ConfigScreen'} component={ConfigScreen}/>
      <Stack.Screen name={'DetailScreen'} component={DetalhesDaConta}/>
      <Stack.Screen name={'ConfigConta'}  component={ConfiguracoesConta}/>
      {/* <Stack.Screen name={'Suporte'} component={Suporte}/>
      <Stack.Screen name={'Seguranca'} component={Seguranca}/> */}
    </Stack.Navigator>
  )
}

const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeStackparamList>()

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Home'} component={HomeScreen}/>
      <Stack.Screen name={'Job'} component={JobDetail}/>
    </Stack.Navigator>
  )
}

const VagasStack = () => {
  const Stack = createNativeStackNavigator<VagasStackParamList>()

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Vagas'} component={VagasScreen}/>
      <Stack.Screen name={'Job'} component={JobDetail}/>
      <Stack.Screen name={'Criar'} component={Criar}/>
      <Stack.Screen name={'Criar_2'} component={Criar_2}/>
    </Stack.Navigator>
  )
}