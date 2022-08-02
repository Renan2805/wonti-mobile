import React, { useState } from 'react';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native'
import { View, Text } from '../components/Themed';
import AppIntroSlider from 'react-native-app-intro-slider';

// Fonts
import { useFonts, loadAsync } from 'expo-font';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { WorkSans_300Light, WorkSans_400Regular } from '@expo-google-fonts/work-sans';
interface Slide {
	key: string,
	title: string,
	text: string,
	image: ImageSourcePropType,
	backgroundColor: string
}

const SLIDES:Array<Slide> = [
	{
		key: 'one',
		title: 'Cadastre-se',
		text: 'Crie sua conta e tenha acesso a milhares de vagas de emprego na área de T.I.',
		image: require('../assets/images/svg-slide1.svg'),
		backgroundColor: '#FFFFFF'
	},
	{
		key: 'two',
		title: 'Entre na sua conta',
		text: 'Após a criação de sua conta, faça login e confirme suas informações.',
		image: require('../assets/images/svg-slide2.svg'),
		backgroundColor: '#FFFFFF'
	},
  {
    key: 'three',
    title: 'Responda as perguntas',
    text: 'Depois de realizar o login, responda o questionário sobre T.I.',
    image: require('../assets/images/svg-slide3.svg'),
    backgroundColor: '#FFFFFF'
  },
  {
    key: 'four',
    title: 'Pronto',
    text: 'Após responder ao questionário sobre T.I, você já pode ter acesso às vagas.',
    image: require('../assets/images/svg-slide4.svg'),
    backgroundColor: '#FFFFFF'
  }
]

interface PropTypes {
  readonly _onDone: () => void
}

export default function IntroScreen({ _onDone }: PropTypes) {

  const [fontsLoaded] = useFonts({
    'Montserrat': require('../assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf'),
    'WorkSans': require('../assets/fonts/WorkSans/WorkSans-VariableFont_wght.ttf'),
  })

	type SlideTypes = {
		item: Slide
	}

	const _renderItems = ({ item }:SlideTypes) => {
		return (
			<View style={styles.slide}>
				<Image 
					source={item.image}
					style={styles.image}
          height={300}
          width={300}
				/>
				<Text style={[styles.title, { fontFamily: 'Montserrat', fontWeight: '700' }]}>{item.title}</Text>
				<Text style={[styles.text, { fontFamily: 'WorkSans', fontWeight: '100'}]}>{item.text}</Text>
			</View>
		)
	}

	const _renderNextButton = () => {
		return (
			<View style={styles.nextButton}>
				<Text style={[styles.buttonText, {fontFamily: 'WorkSans'}]}>{'Próximo'}</Text>
			</View>
		)
	}

  const _renderDoneButton = () => {
    return (
      <View style={styles.nextButton}>
        <Text style={[styles.buttonText, {fontFamily: 'WorkSans', textAlign: 'center'}]}>{'Iniciar'}</Text>

      </View>
    )
  }

  // return (
  //   <Text style={{fontFamily: 'WorkSans_400Regular', fontSize: 30}}>Deez</Text>
  // )

  if(!fontsLoaded) return (
    <Text>Loading...</Text>
  )
  else return (
		<AppIntroSlider 
			data={SLIDES}
			renderItem={_renderItems}
			renderNextButton={_renderNextButton}
      renderDoneButton={_renderDoneButton}
      onDone={_onDone}
      bottomButton={true}
      dotStyle={{backgroundColor: '#FFCDDD'}}
      activeDotStyle={{backgroundColor: '#FF0356'}}
      scrollEnabled={false}
		/>
	)
}

const styles = StyleSheet.create({
	slide: {
		height: '100%',
		backgroundColor: '#fff',
		paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
	},
	title: {
		color: '#CA0747',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
	},
	text: {
		color: 'black',
    fontSize: 25,
    fontWeigh: '100',
    textAlign: 'center'
	},
	image: {
    height: 300,
		width: 300,
    marginHorizontal: 'auto'
	},
	buttonText: {
    fontSize: 24,
    textAlign: 'center'
  } ,
  nextButton: {
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 52,
    width: '100%',
    marginHorizontal: 'auto',
    marginBottom: 50,
    marginTop: 30
  }
})