import React from "react"
import { BsArrowLeftShort } from "react-icons/bs"
import { View, Image, StyleSheet,  TouchableOpacity } from "react-native"

const Header = () => {

  return (
    <View style={[styles.header, {paddingVertical: 0, margin: 0}]}>
       <TouchableOpacity>
        <BsArrowLeftShort size={45}/>
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
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 34
  }
})

export default Header