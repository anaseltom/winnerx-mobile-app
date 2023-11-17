import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { TabActions, useNavigation } from "@react-navigation/native";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrderSummary({route}) {
var address = route.params?.address
var name = route.params?.name
var phone = route.params?.mobile
// console.log(data.address)
const [language, setLanguage] = useState("EN")
  useEffect(() => {
    (async () => {
const lang = await AsyncStorage.getItem("@Language");
      setLanguage(lang);

    })()
  },[])
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 0.1, }}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headertxt}>{language==="EN"?EN.order_summary:AR.order_summary}</Text>
      </View >

      <View style={styles.container}>

        <View style={styles.popupView}>
<Image source={require("./../../assets/Simage.png")} style={{height:160, width:160, marginTop:-120}}/>
          <Text style={styles.txt1}>{language==="EN"?EN.order_placed_successfully:AR.order_placed_successfully}</Text>
          <Text style={styles.txt2}>{language==="EN"?EN.shipping_address:AR.shipping_address}</Text>
          <Text style={styles.txt3}>{name}</Text>
          <Text style={styles.txt4}>{address}</Text>

          {/* <Text style={styles.txt4}> Enclaive -1 Dehli, South Dehli 110048</Text>*/}
          <Text style={styles.txt4}>{language==="EN"?EN.phone_number:AR.phone_number}: {phone}</Text> 

          <TouchableOpacity
             onPress={()=>{
// const jumpToAction = TabActions.jumpTo("Home");
//                 navigation.dispatch(jumpToAction);
navigation.navigate("TabView", {
  screen: 'Home'
})
}}
            style={styles.button1}>
            <Text style={styles.bottontxt1}>{language==="EN"?EN.go_to_home:AR.go_to_home}</Text>
          </TouchableOpacity>
        </View>

      </View>
    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: " #e6f2ff",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    height: 50,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15
  },
  headertxt: {
    flex: 0.9, textAlign: "center", marginLeft: -30,
    fontWeight: "bold",
    fontSize: 18
  },
  popupView: {
    width: "90%",
    alignSelf: "center",
    // height:"50%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: 'center',
    padding: 20
  },
  txt1: {
    fontSize: 17,
    marginTop: 15,
    fontWeight: 'bold',
    color: "#008055"
  },
  txt2: {
    fontWeight: 'bold',
    color: "gray",
    fontSize: 13,
    marginTop: 10,

  },
  txt3: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 14,
  },
  txt4: {
    textAlign: "center",
    marginTop: 5
  },

  button1: {
    height: 50,
    width: "60%",
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  bottontxt1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "gold"
  },
  


})