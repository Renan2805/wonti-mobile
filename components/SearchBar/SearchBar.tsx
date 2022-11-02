import React from "react"
import { View, StyleSheet, TextInput } from "react-native"
import { Search, Filter } from "react-native-iconly"


interface Props {
  _onPressS: () => void,
  _onPressF: () => void,
  _onChangeText: (text: string) => void
}

const SearchBar = ({ _onPressS, _onPressF, _onChangeText}: Props) => {
  return (
    <View style={styles.bar}>
      <Search set="light" size="medium" color="black" onPress={_onPressS} />
      <TextInput placeholder="Procurar Vagas" style={styles.input} onChangeText={_onChangeText}/>
      <Filter set="bold" size="medium" color="black" onPress={_onPressF}/>
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    minHeight: 55,
    maxHeight: 55,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 22,
    paddingVertical: 16,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity:  1,
    shadowRadius: 2,
    elevation: 2
  },
  input: {
    width: '80%',
    fontFamily: 'Montserrat_300Light',
    fontSize: 18
  }
})

export default SearchBar