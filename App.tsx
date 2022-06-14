import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import IntroScreen from './screens/IntroScreen';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const colorScheme = useColorScheme();

  const [showRealApp, setShowRealApp] = useState(false)
  const [logged, setLogged] = useState(false)

  if (showRealApp) {
    if (!logged) {
      return (
        <LoginScreen />
      )
    }

    return (
      <Navigation colorScheme={colorScheme}/>
    )
  }
  else return (
    <SafeAreaProvider>
      <IntroScreen _onDone={() => {
        setShowRealApp(true)
      }}/>
      <StatusBar />
    </SafeAreaProvider>
  );
}

