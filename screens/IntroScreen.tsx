import React from 'react';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native'
import { View, Text } from '../components/Themed';
import AppIntroSlider from 'react-native-app-intro-slider';

// Fonts
import { useFonts } from 'expo-font';
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
		title: 'Cadastre-se',
		text: 'Crie sua conta e tenha acesso a milhares de vagas de emprego na área de T.I.',
		image: require('../assets/images/svg-slide1.png'),
		backgroundColor: '#FFFFFF'
	}
]

interface PropTypes {
  readonly _onDone: () => void
}

export default function IntroScreen({ _onDone }: PropTypes) {

  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    WorkSans_300Light,
    WorkSans_400Regular
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
				/>
				<Text style={[styles.title, { fontFamily: 'Montserrat_700Bold' }]}>{item.title}</Text>
				<Text style={[styles.text, { fontFamily: 'WorkSans_300Light'}]}>{item.text}</Text>
			</View>
		)
	}

	const _renderNextButton = () => {
		return (
			<View style={styles.nextButton}>
				<Text style={[styles.buttonText, {fontFamily: 'WorkSans_400Regular'}]}>{'Próximo'}</Text>
			</View>
		)
	}

  const _renderDoneButton = () => {
    return (
      <View style={styles.nextButton}>
        <Text style={[styles.buttonText, {fontFamily: 'WorkSans_400Regular', textAlign: 'center'}]}>{'Iniciar'}</Text>

      </View>
    )
  }

  if(!fontsLoaded) return (
    <Text>Loading...</Text>
  )
  else return (
		<AppIntroSlider 
			data={SLIDES}
			renderItem={_renderItems}
			renderNextButton={_renderNextButton}
      renderDoneButton={_renderDoneButton}
      bottomButton={true}
      dotStyle={{backgroundColor: '#FFCDDD'}}
      activeDotStyle={{backgroundColor: '#FF0356'}}
      onDone={_onDone}
		/>
	)
}

const styles = StyleSheet.create({
	slide: {
		height: '100vh',
		backgroundColor: '#fff',
		padding: 20,
	},
	title: {
		color: '#CA0747',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
	},
	text: {
		color: 'black',
    fontSize: 25,
    fontWeight: '100',
    textAlign: 'center'
	},
	image: {
    aspectRatio: 1 / 1,
		width: '80%',
    marginHorizontal: 'auto'
	},
	buttonText: {
    fontSize: 24
  } ,
  nextButton: {
    borderRadius: 30,
    paddingVertical: '15px',
    paddingHorizontal: '52px',
    width: '200px',
    marginHorizontal: 'auto',
    marginBottom: 50,
    marginTop: 35
  }
})