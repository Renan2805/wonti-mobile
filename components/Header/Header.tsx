import React from "react"
import { View, Image, StyleSheet,  TouchableOpacity, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"

const Header = () => {

  const navigation = useNavigation()

  return (
    <View style={[styles.header, {paddingVertical: 0, margin: 0}]}>
      <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : {}}>
        <AntDesign name="arrowleft" size={35} color="black" />
      </TouchableOpacity>
      <Image 
        source={require('../../assets/images/logoWonti.png')}
        style={styles.logo}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: '10%'
  },
  logo: {
    height: 30,
    width: 100
  }
})

export default Header