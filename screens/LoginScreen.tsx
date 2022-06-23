import React from 'react'
import { View, KeyboardAvoidingView, Text, Image, StyleSheet } from 'react-native'

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Resume folder-bro 2.jpg')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    width: '100%',
    height: '100%'
  },
  image: {
    width: 310,
    height: 310
  }
})