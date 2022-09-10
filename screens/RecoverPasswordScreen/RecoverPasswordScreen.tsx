import { useState } from "react"
import { View, Text, TextInput, Image, Alert, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator } from "react-native"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../config/firebase"
import Header from "../../components/Header"


const RecoverPasswordScreen = () => {

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendPasswordEmail = async () => {
    setIsLoading(true)
    if(email) {
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert('','Email enviado para ' + email + '\nVerifique sua caixa de spam!')
        })
        .finally(() => setIsLoading(false))
        .catch(e => console.warn(e))
    }
  }
  
  const maybeRenderLoadingOverlay = () => {
    if(isLoading) return (
      <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator animating size="large" />
        </View>
    )
  }

  return (
    <View style={{height: '100%', width: '100%', justifyContent: 'flex-start'}}>
    <Header />
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Image source={require('../../assets/images/resetPassword.png')} style={styles.image}/>
      <TextInput 
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor={'black'}
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={() => sendPasswordEmail()}>
        <Text style={styles.buttonText}>Enviar email</Text>
      </TouchableOpacity>
    </View>
    {
      maybeRenderLoadingOverlay()
    }
    </View>
  )
}

export default RecoverPasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxHeight: '70%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 36,
    fontFamily: 'WorkSans_600SemiBold',
    color: '#FF0356',
    textAlign: 'center'
  },
  image: {
    width: 500,
    height: 400,
  },
  input: {
    width: '100%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 26,
    fontFamily: 'Poppins_300Light',
    textAlign: 'center'
  },
  button: {
    width: '90%',
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#FF0356'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'WorkSans_500Medium',
    color: 'white'
  }
})