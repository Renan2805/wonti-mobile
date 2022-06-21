import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import IntroScreen from './screens/IntroScreen';
import LoginScreen from './screens/LoginScreen';
import InicialScreen from './screens/InicialScreen';

export default function App() {
  const colorScheme = useColorScheme();

  const [showRealApp, setShowRealApp] = useState(false)
  const [logged, setLogged] = useState(true)

  if (showRealApp) {
    if (!logged) {
      return (
        <LoginScreen />
      )
    }

    return (
      <InicialScreen/>
    )
  }
  else return (
    <SafeAreaProvider>
      <IntroScreen 
        _onDone={() => {
          setShowRealApp(true)
        }}
      />
      <StatusBar />
    </SafeAreaProvider>
  );
}

