import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Button,
  Share,
} from "react-native";
import * as ExpoStatusBar from "expo-status-bar";
import Unorderedlist from 'react-native-unordered-list';
import { db, storage } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { Job, VagasStackScreenProps } from "../../types";
import { ArrowLeft } from "react-native-iconly";
import { Entypo } from "@expo/vector-icons";

const JobDetail = ({ navigation, route }: VagasStackScreenProps<"Job">) => {
  const id = route.params.id;

  const [job, setJob] = useState<Job>();
  const [imageUrl, setImageUrl] = useState<string>();

  const [page, setPage] = useState<0 | 1| 2>(0);
  const [isLoading, setIsLoading] = useState(true)

  const [modal, setModal] = useState(false);

  const getImage = async (uid: string) => {
    const storageRef = ref(storage, `Users/${uid}/Profile`);
    await getDownloadURL(storageRef).then(
      (url) => {
        setImageUrl(url);
      },
      () => {}
    );
  };

  const getJob = async () => {
    const docRef = doc(db, `Jobs/${id}`);
    await getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // @ts-ignore
          setJob(snapshot.data());
          pagination(snapshot.data().Requirements)
          getImage(snapshot.data().HirerUid);
          setIsLoading(false)
        }
      })
      .catch((e) => console.error(e));
  };

  const pagination = (data: string[]) => {
    var numberOfPages = 0

    if(data.length % 3 !== 0) numberOfPages = Math.floor((data.length / 3) + 1)
    else  numberOfPages = data.length / 3
    

    return (
      <View>
        {
          data.map((item, index) => {
            if(index + 1 % 3 == 0) {

            }
          })
        }
      </View>
    )
  }

  const renderPage = (page: 0 | 1 | 2) => {
    switch(page) {
      case 0:
        return (
          <ScrollView>
            {
              job && job.Description.map((desc, index) => (
                <View style={{marginVertical: 10}} key={index}>
                  <Unorderedlist style={{fontSize: 16}}>
                    <Text style={{fontSize: 16, textAlign: 'justify'}}>{desc}</Text>
                  </Unorderedlist>
                </View>
              )) 
            }
          </ScrollView>
        )
      case 1:
        return (
          <ScrollView style={{backgroundColor: 'transparent'}}>
            {
              job && job.Requirements.map((req, index) => (
                <View style={{marginVertical: 5}} key={index}>
                  <Unorderedlist style={{fontSize: 16}}>
                    <Text style={{fontSize: 16, textAlign: 'justify'}}>{req}</Text>
                  </Unorderedlist>
                </View>
              )) 
            }
          </ScrollView>
        )
      case 2:
        return (
          <Unorderedlist>
            <Text>Teste</Text>
          </Unorderedlist>
        )
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  const testButton = () => {
    alert("Enviado");
  };
  const modalActive = () => {
    if (modal) {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modal}
          style={{ maxHeight: 50, backgroundColor: "transparent" }}
        >
          <TouchableOpacity 
            onPress={() => setModal(false)}
            style={{flex: 1}}
          >

            <View
              style={{ width: "50%", position: 'absolute', right: 10, top: 50, backgroundColor: 'white', borderRadius: 10}}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 50,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: "row",
                }}
              >
                <Entypo name="heart" size={21} color="black" style={{position: 'absolute', left: 15}}/>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 19,
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Salvar vaga
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onShare()}
                style={{
                  width: "100%",
                  height: 50,
                  padding: 3,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Entypo name="share" size={21} color="black" style={{position: 'absolute', left: 15}}/>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 19,
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Compartilhar
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      );
    } else {
      return false;
    }
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Won diz: ",
        message: "Compartilhe vagas de empregos para seus amigos",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //@ts-ignore
      alert(error);
    }
  };

  if(!isLoading) return (
    <View style={styles.content}>
      <ExpoStatusBar.StatusBar translucent={true} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft set={"light"} color={"black"} size={36} />
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes da vaga</Text>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <View style={styles.section1}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={[styles.title, { fontSize: 28, textAlign: "center" }]}>
            {job?.Title + "\n"}
            <Text style={styles.text}>{`${job?.Hirer}, ${job?.Place}`}</Text>
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.section2}>
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
      <TouchableOpacity
        style={styles.buttonConfirmar}
        onPress={() => testButton()}
      >
        <Text style={{ fontSize: 24, color: "white", fontFamily: 'WorkSans_500Medium' }}>
          Enviar curriculo
        </Text>
      </TouchableOpacity>
      {modalActive()}
    </View>
  )
  else return (
    <Text>Loading</Text>
  )
};

const styles = StyleSheet.create({
  content: {
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
    height: '90%'
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "90%",
  },
  info: {
    width: "100%",
    alignItems: "center",
  },
  section1: {
    alignItems: "center",
  },
  section2: {
    width: "100%",
    alignItems: "center",
  },
  buttonConfirmar: {
    width: "90%",
    padding: 15,
    alignItems: 'center',
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FF0356",
    borderRadius: 30,
  },
  viewConfirmar: {
    width: "100%",
    padding: 5,
    height: 110,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    aspectRatio: 1,
    borderRadius: 10,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
  },
  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  divider: {
    width: "90%",
    height: 0.5,
    backgroundColor: "black",
    marginTop: 8,
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
  flatList: {
    paddingHorizontal: 8,
  },
  textFlat: {
    fontSize: 16,
    marginVertical: 6,
    textAlign: "justify",
  },
  page: {
    width: "90%",
    padding: 20,
  },
});

export default JobDetail;
