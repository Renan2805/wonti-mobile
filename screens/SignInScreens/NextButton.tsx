import { TouchableOpacity, Text, StyleSheet } from "react-native"
interface NextButtonProps {
  _onPress: () => void
}  

const NextButton = ({ _onPress }: NextButtonProps) => {

  return (
    <TouchableOpacity style={styles.button} onPress={_onPress}>
      <Text style={styles.text}>
        {'Próximo'}
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