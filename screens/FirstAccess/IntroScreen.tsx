import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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

type Props = NativeStackScreenProps<RootStackParamList>

export default function IntroScreen({navigation}: Props) {

	type SlideTypes = {
		item: Slide
	}

	const _renderItems = ({ item }:SlideTypes) => {
		return (
			<View style={styles.slide}>
        <View style={styles.slideContent}>
          <Image 
            source={item.image}
            style={styles.image}
          />
          <View style={{
            flex: 1,
            justifyContent: 'space-around',
            maxHeight: '40%'
          }}>
            <Text style={[styles.title, { fontFamily: 'Montserrat_700Bold'}]}>{item.title}</Text>
            <Text style={[styles.text, { fontFamily: 'WorkSans_300Light'}]}>{item.text}</Text>
          </View>
        </View>
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
      onDone={() => navigation.navigate('LoginScreen')}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
	},
  slideContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    maxHeight: '75%',
    gap: 100
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
    maxWidth: '90%'
	},
	image: {
    minHeight: '50%',
    minWidth: '40%',
    maxHeight: 300,
    maxWidth: 300
	},
	buttonText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
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
    marginTop: 20,
    backgroundColor: 'black'
  }
})