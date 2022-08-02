import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { useFonts } from "expo-font"
import { WorkSans_500Medium } from "@expo-google-fonts/work-sans"

interface NextButtonProps {
  _onPress: () => void
}

const NextButton = ({ _onPress }: NextButtonProps) => {

  const [fontsLoaded] = useFonts({
    WorkSans_500Medium
  })
return (
    <TouchableOpacity style={styles.button} onPress={() => _onPress}>
      <Text style={styles.text}>
        {fontsLoaded ? 'Próximo' : 'Carregando'}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'black',
    borderRadius: 30,
    marginTop: '10%'
  },
  text: {
    fontFamily: 'WorkSans_500Medium',
    fontSize: 23,
    color: 'white',
    textAlign: 'center'
  }
})

export default NextButton