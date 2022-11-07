import { Text } from "react-native"
import { useFonts } from "expo-font"
import { WorkSans_400Regular,  WorkSans_600SemiBold } from "@expo-google-fonts/work-sans"

const Footer = () => {
  useFonts({
    WorkSans_400Regular,
    WorkSans_600SemiBold
  })

  return (
    <Text style={{
      fontFamily: 'WorkSans_400Regular', 
      fontSize: 17, 
      textAlign: 'center', 
      width: '100%',
      position: 'absolute',
      bottom: '4%'
    }}
    >
      Precisando de ajuda? {'\n'}
      Entre em <Text style={{fontFamily: 'WorkSans_600SemiBold', color: '#CA0747'}}>contato</Text>
    </Text>
  )
}

export default Footer