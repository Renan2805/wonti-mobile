import React, { useEffect, useState } from "react"
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from "react-native"
import * as ExpoStatusBar from 'expo-status-bar'
import { AntDesign } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { auth } from "../../config/firebase"
import { Empresa } from "../../types"
import { getData } from "../../hooks/useAsyncStorage"

const Criar = () => {

  const [cargo, setCargo] = useState<string>()
  const [salar, setSalar] = useState<string>()
  const [exper, setExper] = useState<string>()
  const [tipov, setTipov] = useState<string>()
  const [tipoe, setTipoe] = useState<string>()

  const navigation = useNavigation()

  const goNext = () => {
    const dados = {
      cargo: cargo,
      salario: salar,
      experiencia: exper,
      tipo_vaga: tipov,
      tipo_expediente: tipoe
    }

    // @ts-ignore
    navigation.navigate('Criar_2', { dados: dados })

  }
  
  return (
    <View style={{marginTop: StatusBar.currentHeight, flex: 1, backgroundColor: 'white'}}>
      <ExpoStatusBar.StatusBar backgroundColor="white"/>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name={'arrowleft'} size={35} color={'black'}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Adicionar Vaga</Text>
        <AntDesign name={'arrowright'} size={35} color={'rgba(0, 0, 0, 0)'}/>
      </View>
      <View style={styles.main}>
        <View style={styles.labeledInput}>
          <Text style={styles.label}>Cargo</Text>
          <TextInput
            style={styles.input}
            value={cargo}
            onChangeText={setCargo}
          />
        </View>
        <View style={styles.labeledInput}>
          <Text style={styles.label}>Salário</Text>
          <TextInput
            style={styles.input}
            value={salar}
            onChangeText={setSalar}
          />
        </View>
        <View style={styles.labeledInput}>
          <Text style={styles.label}>Nível de Experiência</Text>
          <TextInput
            style={styles.input}
            value={exper}
            onChangeText={setExper}
          />
        </View>
        <View style={styles.labeledInput}>
          <Text style={styles.label}>Tipo de Vaga</Text>
          <TextInput
            style={styles.input}
            value={tipov}
            onChangeText={setTipov}
          />
        </View>
        <View style={styles.labeledInput}>
          <Text style={styles.label}>Tipo de Expediente</Text>
          <TextInput
            style={styles.input}
            value={tipoe}
            onChangeText={setTipoe}
          />
        </View>
      </View>
      <View style={{alignItems: 'center', position: 'absolute', bottom: 20, width: '100%'}}>
        <TouchableOpacity style={styles.btn} onPress={() => goNext()}>
          <Text style={styles.btnText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const Criar_2 = () => {

  const navigation = useNavigation()
  const route = useRoute()

  const [userData, setUserData] = useState<Empresa>()
  const [page, setPage] = useState<0 | 1 | 2>(0);
  const [photo, setPhoto] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [descricao, setDescricao] = useState<string>()
  const [requisitos, setRequisitos] = useState<string>()
  const [empresa, setEmpresa] = useState<string>()

  const getUserData = async () => {
    try {
      const data = await getData('user_data')
      if(typeof data == 'string') {
        const dataJson = JSON.parse(data)
        setUserData(dataJson)
        setIsLoading(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const criarVaga = () => {

  }

  useEffect(() => {
    setIsLoading(true)
    getUserData()
    if(auth.currentUser?.photoURL) setPhoto(auth.currentUser.photoURL)
  }, [])

  const renderPage = (page: 0 | 1 | 2) => {
    switch(page) {
      case 0:
        return (
          <ScrollView style={{width: '100%'}}>
            <TextInput 
              style={[styles.input, {minWidth: '100%', textAlignVertical: 'top', paddingVertical: 20}]}
              placeholder={'Descrição da Vaga (máx 150 palavras)'}
              numberOfLines={6}
              value={descricao}
              onChangeText={setDescricao}
            />
          </ScrollView>
        )
      case 1:
        return (
          <ScrollView style={{backgroundColor: 'transparent'}}>
            <TextInput 
              style={[styles.input, {minWidth: '100%', textAlignVertical: 'top', paddingVertical: 20}]}
              placeholder={'Requisitos (máx 200 palavras)'}
              numberOfLines={6}
              value={requisitos}
              onChangeText={setRequisitos}
            />
          </ScrollView>
        )
      case 2:
        return (
          <ScrollView>
            <TextInput 
              style={[styles.input, {minWidth: '100%', textAlignVertical: 'top', paddingVertical: 20}]}
              numberOfLines={6}
              value={empresa}
              onChangeText={setEmpresa}
            />
          </ScrollView>
        )
    }
  };

  if(!isLoading) return (
    <View style={{marginTop: StatusBar.currentHeight, flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name={'arrowleft'} size={35} color={'black'}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Adicionar Vaga</Text>
        <AntDesign name={'arrowright'} size={35} color={'rgba(0, 0, 0, 0)'}/>
      </View>
      <View style={[styles.main, { height: '80%'}]}>
        <View style={styles.section1}>
          <Image 
            source={{uri: photo}}
            style={styles.image}
          />
          {/* @ts-ignore */}
          <Text style={styles.title}>{route.params.dados.cargo}</Text>
          <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 14.5}}>{`${userData?.dados_empresariais.nome}, ${userData?.endereco.cidade}, ${userData?.endereco.uf}`}</Text>
        </View>
        <View 
          style={{width: '80%', backgroundColor: '#D9D9D9', height: 1}}
        />
        <View>
        <View style={styles.pages}>
            <TouchableOpacity
              style={[
                styles.pageButton,
                page === 0 && { backgroundColor: "black" },
              ]}
              onPress={() => setPage(0)}
            >
              <Text style={[styles.pageText, page === 0 && { color: "white" }]}>
                Descrição da vaga
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.pageButton,
                page === 1 && { backgroundColor: "black" },
              ]}
              onPress={() => setPage(1)}
            >
              <Text style={[styles.pageText, page === 1 && { color: "white" }]}>
                Requisitos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.pageButton,
                page === 2 && { backgroundColor: "black" },
              ]}
              onPress={() => setPage(2)}
            >
              <Text style={[styles.pageText, page === 2 && { color: "white" }]}>
                Empresa
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.page]}>{renderPage(page)}</View>
        </View>
      </View>
      <View style={{alignItems: 'center', position: 'absolute', bottom: 20, width: '100%'}}>
        <TouchableOpacity style={styles.btn} onPress={() => criarVaga()}>
          <Text style={styles.btnText}>Concluído</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  else return (
    <Text>Loading...</Text>
  )

}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24
  },
  main: {
    marginTop: 30,
    alignItems: 'center',
    height: '70%'
  },
  image: {
    width: 100,
    aspectRatio: 1 / 1,
    borderRadius: 10
  },
  headerText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20
  },
  labeledInput: {
    width: '90%',
    flex: .8,
    justifyContent: 'space-around'
  },
  input: {
    width: '100%',
    borderRadius: 40,
    borderColor: 'rgba(132, 132, 132, .5)',
    borderWidth: 1,
    fontSize: 15,
    fontFamily: 'Poppins_300Light',
    lineHeight: 15,
    paddingHorizontal: 17,
    paddingVertical: 10
  },
  label: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 17,
    color: '#4A4949'
  },
  btn: {
    width: '80%',
    borderRadius: 40,
    backgroundColor: 'rgba(255, 3, 86, .8)',
    alignItems: 'center',
    paddingVertical: 17
  },
  btnText: {
    fontFamily: 'WorkSans_500Medium',
    fontSize: 24,
    color: 'white'
  },
  section1: {
    width: '100%',
    alignItems: 'center'
  },
  pages: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
  },
  pageButton: {
    backgroundColor: "rgba(0, 0, 0, .05)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  pageText: {
    fontFamily: "Poppins_300Light",
  },
  page: {
    width: "100%",
    padding: 20,
    alignItems: 'center'
  },
})

export default Criar