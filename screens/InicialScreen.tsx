import { Image, StyleSheet } from "react-native"
import { View, Text } from "../components/Themed"

export default function InicialScreen() {

  return (
    <View style={styles.container}>
      {/* <Image 
        source={require('../assets/images/Logo WonTI.png')}
        width={110}
      /> */}
      <Text>Texto</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})