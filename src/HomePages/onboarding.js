import React, { useState ,useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  Linking,
  Alert
} from "react-native";

import {  Ionicons } from "@expo/vector-icons";
import { EN } from "../../language/en";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AR } from "../../language/ar";
import Loader from "../component/Loader";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Onboarding1({ navigation, route }) {
  const [modalVisible2, setModalVisible2] = useState(false);
  const [Name, setName] = useState("English");
  const [lang, setLang] = useState("EN")
const [loading, setLoading] = useState(true)
  const readData = async () => {
    try {
const user = await AsyncStorage.getItem("user");
      const isFirst = await AsyncStorage.getItem("isFirst");
      // const currentUser = JSON.parse(savedUser);
      
      // console.log(savedUser);

     user? navigation.navigate("TabView"): isFirst === "1"?navigation.navigate("Login"):null
setLoading(false)
    } catch (error) {
setLoading(false)

      console.log(error);
    }
  };
  useEffect(() => {
    readData()
    // console.log("aaa")
// console.log(EN.)
  }, []);
 
  // console.log("aa")
if(loading){
return <Loader loading={loading}/>
}
  return (
    <View>
      <ScrollView>
        <View>

          <View>
            <ImageBackground
              source={require("../../assets/product.jpeg")}
              resizeMode="cover"
              style={styles.box2}
            >
{route.params?.type?
 <TouchableOpacity
          style={{position:'absolute', top:10, left:10, height:50, width:50 }}
          onPress={() => navigation.navigate("TabView")}
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>:null}
       
              <Image
                source={require("../../assets/x2.png")}
                resizeMode="cover"
                style={styles.box}
              ></Image>

              <Text style={styles.text1}>Personalise your experience</Text>

              <View style={styles.modalView2}>
                <TouchableOpacity  onPress={() => setModalVisible2(true)}>
                <View style={styles.textinput2}>
                  <Text
                    style={styles.lang1}
                    
                  >
                    Language
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.name}>{Name}</Text>
                    <Text style={styles.icon}>
                      <Ionicons
                        name="ios-chevron-down-outline"
                        size={24}
                        color="black"
                      />
                    </Text>
                  </View>
                </View>
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible2}
                  onRequestClose={() => setModalVisible2(false)}
                >
                  <View style={styles.centeredView1}>
                    <View style={styles.modalView1}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 0.9, marginTop:20 }}>
                        
                            <Text style={styles.select}>Select a Language</Text>
                          
                        </View>
                      
                          <TouchableOpacity
                            style={{
                              marginTop: 15,
                            }}
                            onPress={() => setModalVisible2(!modalVisible2)}
                          >
                            <Text
                              style={{
                                fontSize: 30,
                              }}
                            >
                              x
                            </Text>
                          </TouchableOpacity>
                        
                      </View>
                    
                        <TouchableOpacity
                          onPress={() => {
                            setName("English")
                            setLang("EN")
                            setModalVisible2(!modalVisible2)
                          }}
                          style={styles.language}
                        >
                          <Text style={styles.lang}>English</Text>
                        </TouchableOpacity>
                      
                     
                        <TouchableOpacity
                          onPress={() => {
                            setName(AR.arabic)
                            setLang("AR")
                            setModalVisible2(!modalVisible2)
                          }}
                          style={styles.language}
                        >
                          <Text style={styles.lang}>{AR.arabic}</Text>
                        </TouchableOpacity>
                      
                    </View>
                  </View>
                </Modal>
               
                  <TouchableOpacity  onPress={async() =>{
                     if (route.params?.type) {
                      // Post updated, do something with `route.params.post`
                      // For example, send the post to the server
                      await AsyncStorage.setItem("@Language", lang)

                      navigation.navigate("TabView")
                    }else{
                     await AsyncStorage.setItem("@Language", lang)
                     navigation.navigate("vid")
                    }
                   }} style={styles.save}>
                    <Text style={styles.save_text}>Save and proceed</Text>
                  </TouchableOpacity>
                
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.out1}>
                  By continuing you agree to our
                  </Text>
                  <Text style={styles.out2} onPress={async () => {
          const url = 'https://www.winnerx.com/terms-of-use'
          const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
          if (supported) {
            await Linking.openURL(url); // It will open the URL on browser.
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }}>
                  Terms and Conditions and Privacy Policy
                  </Text>
                  <View style={styles.line}></View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  name: {
    marginStart: 20,

    marginTop: 5,
    fontSize: 20,
  },
  icon: {
    marginStart: "60%",
    color: "grey",
    marginTop: 10,
    fontSize: 14,
  },
  line: {
    // height: 1,
    // width: width * 0.7,
    // backgroundColor: "grey",
  },
  out2: {
    fontSize: 13,
    fontWeight: "500",
    // width: 280,
    textAlign: "center",
    textDecorationLine: 'underline',
    color: "grey",
  },
  out1: {
    fontSize: 13,
    fontWeight: "500",
    // width: 251,
    textAlign: "center",
    marginTop: 15,
    color: "grey",
  },
  save_text: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    
    color: "gold",
  },
  save: {
    height: height * 0.08,
    width: width * 0.85,
    backgroundColor: "black",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,alignItems:"center",justifyContent:"center"
  },
  lang1: {
    marginStart: 20,
    color: "grey",
    marginTop: 10,
    fontSize: 13,
  },
  text1: {
    color: "black",
    marginTop: 10,
    fontSize: 28,
    fontWeight: "600",
    fontWeight: "800",
    width: "60%",
    marginStart: 25,
    marginBottom: "5%",
  },
  select: {
    fontSize: 25,
    fontWeight: "700",
    marginLeft: 30,
  },
  lang: {
    fontSize: 23,

    fontWeight: "300",
    textAlign: "left",
    marginTop: 15,
    marginStart: 30,
  },
  language: {
    height: 70,
    width: "85%",

    borderRadius: 10,
    backgroundColor: "#e6e6e6",
    marginTop: 30,
    marginLeft: 30,elevation:1
  },
  textinput2: {
    height: height * 0.1,
    width: width * 0.85,
    borderWidth: 1,
    backgroundColor: "white",
    alignSelf: "center",

    borderRadius: 6,

    borderColor: "grey",
    marginTop: 30,
  },
  centeredView2: {
    
    

    // backgroundColor:"white",
  },
  centeredView1: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 0,
    marginBottom: -30,
    marginHorizontal: 0,

    // backgroundColor:"white",
  },
  modalView2: {
    height: "70%",
    width: "95%",
    margin: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    alignSelf: "center",
    borderTopRightRadius: 10,
    

    elevation: 5,
  },
  modalView1: {
    height: "40%",
    width: "100%",
    margin: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    alignSelf: "center",
    borderTopRightRadius: 20,
marginBottom:10,
    elevation: 5,
  },
  box2: {
    // height: height * 0.35,
    width: width,
    height: height,
    alignSelf: "center",
  },
  box: {
    // height: height * 0.35,
    width: width * 0.6,
    height: height * 0.4,
    alignSelf: "center",
    alignItems: "center",
    resizeMode: "cover",
    marginTop: 40,
  },
  header: {
    height: 65,
    backgroundColor: "black",

    justifyContent: "center",
    marginTop: 0,
  },
  headertxt: {
    marginStart: 15,
  },
  headertxt1: {
    color: "white",
    fontWeight: "bold",
    flex: 0.25,
    marginTop: 15,
  },
  // video: {
  //     alignSelf: 'center',
  //     width:width,
  //     height: height*0.5,borderBottomLeftRadius:10,borderBottomRightRadius:10
  //   },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    right: 0,
    flex: 1,
  },
});
