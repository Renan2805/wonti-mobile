import React from "react"
import { View, Image, StyleSheet,  TouchableOpacity, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { CaretLeft } from "react-native-iconly"
import { AntDesign } from "@expo/vector-icons"

const Header = () => {

  const navigation = useNavigation()

  return (
    <View style={[styles.header, {paddingVertical: 0, margin: 0}]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
    height: '10%',
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight
  },
  logo: {
    width: 75,
    height: 23
  }
})

export default Header