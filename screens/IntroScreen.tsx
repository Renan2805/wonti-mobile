import React from 'react';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native'
import { View, Text } from '../components/Themed';
import AppIntroSlider from 'react-native-app-intro-slider';

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
		image: require('../assets/images/svg-slide1.png'),
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

export default function IntroScreen() {

	type SlideTypes = {
		item: Slide
	}

	const _renderItems = ({ item }:SlideTypes) => {
		return (
			<View style={styles.slide}>
				<Image 
					source={item.image}
					style={styles.image}
				>
				</Image>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.text}>{item.text}</Text>
			</View>
		)
	}

	const _renderNextButton = () => {
		return (
			<View style={styles.nextButton}>
				<Text style={styles.buttonText}>{'Próximo'}</Text>
			</View>
		)
	}

	return (
		<AppIntroSlider 
			data={SLIDES}
			renderItem={_renderItems}
			renderNextButton={_renderNextButton}
		/>
	)
}

const styles = StyleSheet.create({
	slide: {
		height: '100vh',
		backgroundColor: '#fff',
		padding: 20
	},
	title: {
		color: '#CA0747'
	},
	text: {
		color: 'black'
	},
	image: {
		height: '200px',
		width: '200px'
	},
	buttonText: {} 
})