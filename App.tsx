import React, { useState } from 'react'
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import IntroScreen from './screens/IntroScreen';
import LoginScreen from './screens/LoginScreens/LoginScreen';
import InicialScreen from './screens/InicialScreen';
import Welcome from './screens/SignInScreens/Welcome';
import SignIn_2 from './screens/SignInScreens/Hirer/SignIn_2';

export default function App() {
  const colorScheme = useColorScheme();

  const [showRealApp, setShowRealApp] = useState(true)
  const [logged, setLogged] = useState(false)


  return (
    <IntroScreen _onDone={() => {}}/>
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

