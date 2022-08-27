import React from "react"
import { View, StyleSheet, TextInput } from "react-native"
import { Search, Filter } from "react-native-iconly"


const SearchBar = () => {
  return (
    <View style={styles.bar}>
      <Search set="light" size="medium" color="black"/>
      <TextInput placeholder="Procurar Vagas" style={styles.input} />
      <Filter set="light" size="medium" color="black"/>
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    width: '90%',
    minHeight: 55,
    maxHeight: 55,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 22,
    paddingVertical: 16,
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    width: '70%',
    fontFamily: 'Montserrat_300Light',
    fontSize: 16
  }
})

export default SearchBar