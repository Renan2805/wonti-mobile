import React, { useState } from 'react';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native'
import { View, Text } from '../../components/Themed';
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
		image: require('../../assets/images/svg-slide1.png'),
		backgroundColor: '#FFFFFF'
	},
	{
		key: 'two',
		title: 'Entre na sua conta',
		text: 'Após a criação de sua conta, faça login e confirme suas informações.',
		image: require('../../assets/images/svg-slide2.png'),
		backgroundColor: '#FFFFFF'
	},
  {
    key: 'three',
    title: 'Responda as perguntas',
    text: 'Depois de realizar o login, responda o questionário sobre T.I.',
    image: require('../../assets/images/svg-slide3.png'),
    backgroundColor: '#FFFFFF'
  },
  {
    key: 'four',
    title: 'Pronto',
    text: 'Após responder ao questionário sobre T.I, você já pode ter acesso às vagas.',
    image: require('../../assets/images/svg-slide4.png'),
    backgroundColor: '#FFFFFF'
  }
]

interface PropTypes {
  readonly _onDone: () => void
}

export default function IntroScreen({ _onDone }: PropTypes) {

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
				/>
				<Text style={[styles.title, { fontFamily: 'Montserrat_700Bold'}]}>{item.title}</Text>
				<Text style={[styles.text, { fontFamily: 'WorkSans_300Light'}]}>{item.text}</Text>
			</View>
		)
	}

	const _renderNextButton = () => {
		return (
      <View style={styles.buttonWrapper}>
        <View style={styles.nextButton}>
          <Text style={[styles.buttonText, {fontFamily: 'WorkSans_400Regular'}]}>{'Próximo'}</Text>
        </View>
      </View>
		)
	}

  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonWrapper}>
        <View style={styles.nextButton}>
          <Text style={[styles.buttonText, {fontFamily: 'WorkSans_400Regular', textAlign: 'center'}]}>{'Iniciar'}</Text>
        </View>
      </View>
    )
  }
  
  return (
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
		paddingTop: 100,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center'
	},
	title: {
		color: '#CA0747',
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20
	},
	text: {
		color: 'black',
    fontSize: 25,
    textAlign: 'center',
    maxWidth: '80%'
	},
	image: {
    height: 300,
		width: 300,
	},
	buttonText: {
    fontSize: 24,
    textAlign: 'center'
  },
  buttonWrapper: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  nextButton: {
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 52,
    width: '60%',
    marginHorizontal: 'auto',
    marginBottom: 50,
    marginTop: 30
  }
})