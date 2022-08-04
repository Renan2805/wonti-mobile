import React, { useState } from 'react'
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useColorScheme from './hooks/useColorScheme';

import IntroScreen from './screens/FirstAccess/IntroScreen';
import FirstScreen from './screens/FirstAccess/FirstScreen';

import LoginScreen from './screens/LoginScreens/LoginScreen';
import InicialScreen from './screens/InicialScreen';
import Welcome from './screens/SignInScreens/Welcome';
import SignIn_2 from './screens/SignInScreens/Hirer/SignIn_2';

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

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false)

  const loadFonts = async () => {
    await Font.loadAsync({
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
      WorkSans_900Black
    })

    setFontsLoaded(true)
  }

  loadFonts()

  const colorScheme = useColorScheme();

  const [showRealApp, setShowRealApp] = useState(true)
  const [logged, setLogged] = useState(false)


  const Stack = createNativeStackNavigator()

  if(fontsLoaded) return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={'First'} component={FirstScreen} />
        <Stack.Screen name={"Intro"} component={IntroScreen} />
        <Stack.Screen name={'LoginScreen'} component={LoginScreen}/>     
      </Stack.Navigator>
    </NavigationContainer>
  )
  else return (
    <Text>Loading...</Text>
  )
  // return (
  //   <IntroScreen _onDone={() => {
  //     setShowRealApp(true)
  //   }}/>
  // )

  // if (showRealApp) {
  //   if (!logged) {
  //     return (
  //       <LoginScreen />
  //     )
  //   } else return (
  //     <InicialScreen/>
  //   )
  // }
  // else return (
  //   <SafeAreaProvider>
  //     <IntroScreen 
  //       _onDone={() => {
  //         setShowRealApp(true)
  //       }}
  //     />
  //     <StatusBar />
  //   </SafeAreaProvider>
  // );
}

