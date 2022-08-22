import { ScrollView, Text, StyleSheet } from 'react-native'
import CardRecommended from '../components/CardRecommended/CardRecommended'
import { RootTabScreenProps } from '../types'

const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {

  return (
    <ScrollView contentContainerStyle={style.content}>
      <CardRecommended 
        image={'https://logopng.com.br/logos/google-37.svg'}
        title={'Vaga'}
        description={'Vaga foda'}
        hirer={'Google'}
        theme={false}
        time={'Integral'}
        type={'Remoto'}
        salary={2000}
        competitors={20}
        place={'São Paulo, SP'}
        posted={2}
      />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomeScreen