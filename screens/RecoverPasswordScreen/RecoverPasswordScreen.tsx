import { useState } from "react"
import { View, Text, TextInput, Image, Alert, StyleSheet } from "react-native"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../config/firebase"


const RecoverPasswordScreen = () => {

  const [email, setEmail] = useState('')

  const sendPasswordEmail = () => {
    if(auth.currentUser?.email) {
      sendPasswordResetEmail(auth, auth.currentUser?.email)
        .then(() => {
          Alert.alert('Email enviado para ' + auth.currentUser?.email)
        })
    }
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
    </View>
  )
}

export default RecoverPasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  ìnput: {
    
  }
})