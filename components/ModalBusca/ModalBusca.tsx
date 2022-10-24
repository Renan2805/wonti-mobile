import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

interface ModalBuscaPropsType {
  searchTerm: string,
  onClose: () => void
}

export default function ModalBusca({ searchTerm, onClose }: ModalBuscaPropsType) {



  return (
    <View style={styles.content}>
      <TouchableOpacity
        onPress={() => onClose()}
        style={styles.closeBtn}
      >
        <FontAwesome name={'close'} color={'black'} style={{fontSize: 32}}/>
      </TouchableOpacity>
      <Text>ModalBusca</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  closeBtn: {
    alignSelf: 'flex-end'
  }
})