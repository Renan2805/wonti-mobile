import { useState } from "react"
import { View, Text, TextInput, Image, Alert, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, Modal } from "react-native"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../config/firebase"
import Header from "../../components/Header"


const RecoverPasswordScreen = () => {

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const sendPasswordEmail = async () => {
    setIsLoading(true)
    if(email == '') {
      setIsLoading(false)
      setModal(true)
    }
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
      <Image source={require('../../assets/images/resetPassword.png')} style={styles.image}/>
      <View style={styles.viewTexts}>
        <Text style={{fontSize:25, marginVertical:10,fontFamily: 'WorkSans_600SemiBold',color: '#FF0356'}}>Esqueceu sua senha?</Text>
        <Text style={{fontFamily:'WorkSans_600SemiBold', fontSize:17, paddingBottom:5}}>Enviaremos um e-mail com instruções de como redefinir sua senha.</Text>
        <Text style={{ fontSize:17, paddingTop:10}}>
        E-mail
      </Text>
      </View>
      <TextInput 
        keyboardType="email-address"
        placeholderTextColor={'black'}
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={() => sendPasswordEmail()}>
          <Text style={styles.buttonText}>Enviar email</Text>
        </TouchableOpacity>
      </View>
    </View>
    {
      maybeRenderLoadingOverlay()
    }
    <View style={{width:'100%'}}>
      <Modal
          animationType='none'
          transparent={false}
          visible={modal}
          style={{maxHeight:50, backgroundColor:'transparent'}}
          >
            <Text>Por favor </Text>
          </Modal>
     </View>   
    </View>
  )
}

export default RecoverPasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxHeight: '75%',
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
    maxWidth:400,
    maxHeight: 300,
  },
  viewButton: {
    width:'100%',
    marginTop:15
  },
  input: {
   width:'100%',
   height:50,
   borderWidth:1,
   padding:5,
   fontSize:20,
   textAlign:'center',
   borderRadius:30
  },
  button: {
    width: '100%',
    borderRadius:30,
    paddingVertical: 8,
    backgroundColor: '#FF0356',
    paddingTop:10
  },
  viewTexts: {
    width:'100%',
    paddingVertical:5
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'WorkSans_500Medium',
    color: 'white'
  }
})