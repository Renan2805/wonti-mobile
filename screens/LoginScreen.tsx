import React from 'react'
import { KeyboardAvoidingView, Text, Image, StyleSheet } from 'react-native'
import SvgUri from 'react-native-svg-uri'

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView>
      <SvgUri 
        source={require('../assets/images/login.svg')}
        width={'100%'}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%'
  }
})