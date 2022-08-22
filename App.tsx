import React, { useState } from 'react'
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useColorScheme from './hooks/useColorScheme';

import IntroScreen from './screens/FirstAccess/IntroScreen';
import FirstScreen from './screens/FirstAccess/FirstScreen';

import LoginScreen from './screens/LoginScreens/LoginScreen';
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
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList, RootTabScreenProps } from './types';
import HomeScreen from './screens/HomeScreen';
import { Home, Work, Chat, Setting } from 'react-native-iconly';
import ChatScreen from './screens/ChatScreen';
import ConfigScreen from './screens/ConfigScreen';
import VagasScreen from './screens/VagasScreen';

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
      WorkSans_900Black
  })

  // const loadFonts = async () => {
  //   await Font.loadAsync({
  //     Montserrat_100Thin,
  //     Montserrat_200ExtraLight,
  //     Montserrat_300Light,
  //     Montserrat_400Regular,
  //     Montserrat_500Medium,
  //     Montserrat_600SemiBold,
  //     Montserrat_700Bold,
  //     Montserrat_800ExtraBold,
  //     Montserrat_900Black,
  
  //     WorkSans_100Thin,
  //     WorkSans_200ExtraLight,
  //     WorkSans_300Light,
  //     WorkSans_400Regular,
  //     WorkSans_500Medium,
  //     WorkSans_600SemiBold,
  //     WorkSans_700Bold,
  //     WorkSans_800ExtraBold,
  //     WorkSans_900Black
  //   })

  //   setFontsLoaded(true)
  // }

  // loadFonts()

  const colorScheme = useColorScheme();

  const [showRealApp, setShowRealApp] = useState(true)
  const [logged, setLogged] = useState(false)


  const Stack = createNativeStackNavigator()

  if(fontsLoaded) return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name={'First'} component={FirstScreen} />
        <Stack.Screen name={'Intro'} component={IntroScreen} />
        <Stack.Screen name={'LoginScreen'} component={LoginScreen}/>     
        <Stack.Screen name={'App'} component={BottomTabNavigator}/>
      </Stack.Navigator>
      <StatusBar style="dark" translucent={true}/>
    </NavigationContainer>
  )
  else return (
    <Text>Loading...</Text>
  )
}
      
export function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const BottomTab = createBottomTabNavigator<RootTabParamList>();

  return (
    <BottomTab.Navigator

      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#FF0356',
        tabBarInactiveTintColor: '#000000',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          height: '10%'
        }
        
      }}
      >
        
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }: RootTabScreenProps<'Home'>) => ({
            tabBarIcon: ({ color, focused }) => focused ? <Home primaryColor={color} set="bold" size={'large'}/> : <Home primaryColor={color} size={'large'}/>,
            
          })}
        />
        <BottomTab.Screen
          name="Vagas"
          component={VagasScreen}
          options={({ navigation }: RootTabScreenProps<'Vagas'>) => ({
            tabBarIcon: ({ color, focused }) => focused ? <Work primaryColor={color} set="bold" size={'large'}/> : <Work primaryColor={color} size={'large'}/>,
          })}
        />
        <BottomTab.Screen
          name="Chat"
          component={ChatScreen}
          options={({ navigation }: RootTabScreenProps<'Chat'>) => ({
            tabBarIcon: ({ color, focused }) => focused ? <Chat primaryColor={color} set="bold" size={'large'}/> : <Chat primaryColor={color} size={'large'}/>,
          })}
        />
        <BottomTab.Screen
          name="Config"
          component={ConfigScreen}
          options={({ navigation }: RootTabScreenProps<'Config'>) => ({
            tabBarIcon: ({ color, focused }) => focused ? <Setting primaryColor={color} set="bold" size={'large'}/> : <Setting primaryColor={color} size={'large'}/>,
          })}
        />
    </BottomTab.Navigator>
  );
}