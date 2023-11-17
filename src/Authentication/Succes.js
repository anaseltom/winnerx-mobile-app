import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AR } from "../../language/ar";
import { EN } from "../../language/en";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Success({ navigation }) {
const [language, setLanguage] = React.useState("EN");

  useEffect(() => {
    AsyncStorage.getItem("@Language").then((lang) => {
      setLanguage(lang);

    });

    
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", marginLeft:10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.headertxt}>
              <Ionicons name="ios-arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{ marginTop: "20%" }}>
          <Image
            source={require("../../assets/thumb.png")}
            resizeMode="cover"
            style={styles.box}
          ></Image>
<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", marginTop:30}}>{language==="EN"?EN.logged_in_suucessfully:AR.logged_in_suucessfully}</Text>

          <TouchableOpacity
            onPress={() =>{
  // AsyncStorage.setItem("user", JSON.stringify({"user":"user"}));
  //             AsyncStorage.setItem("loginType", "OTP")
 navigation.navigate("TabView")

            }}
            style={styles.tab}
          >
            <Text style={styles.save_text}>{language === "EN"?EN.go_to_home:AR.go_to_home}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  save_text: {
    fontSize: 17,
    fontWeight: "800",

    color: "gold",
  },

  box: {
    height: 200,
    width: 200,
    resizeMode: "contain",
alignSelf:"center"
  },
  tab: {
    height: height * 0.09,
    width: width * 0.9,
    backgroundColor: "black",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
});
