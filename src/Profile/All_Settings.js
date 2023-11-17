import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,Alert
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import {
  Entypo,
  Feather,
  AntDesign,
  SimpleLineIcons,
  Ionicons,
  Octicons,
  FontAwesome,
  FontAwesome5,
  EvilIcons, MaterialIcons
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";
import { DELETE_ACCOUNT } from "../API";



export default function All_Settings({ navigation, language, email, mobile, name, id }) {

   const Account_delete = () => {
    (async () => {
     
      
      DELETE_ACCOUNT(id)
        .then((response) => response.json())
        .then((result) => {
           console.log(result)
           AsyncStorage.clear(),
           navigation.navigate('on1')

          
        })
        
        .catch((error) => console.log("error", error));
    })();
  }


    

     const createThreeButtonAlert = () =>
    Alert.alert('Delete Account', 'Are you sure want to delete your account ?', [
      
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },{
        text: 'Yes',
        onPress: () => Account_delete(),
      },
    
    ]);

  return (
    <ScrollView style={{}}>
      <View style={styles.container}>
        <View style={styles.text1view}>
          <Text style={styles.support_text}>{language === "EN" ? EN.account : AR.account}</Text>
          
        </View>
        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { navigation.navigate("account", { mobile: mobile, email: email, name: name, id: id }) }}>
          <View style={{ flex: 0.18, marginStart: "8%" }}>
            <FontAwesome5 name="user" size={24} color="black" />
          </View>
          <Text style={{ fontSize: 18, flex: 0.8, textAlign: "left" }}>{language === "EN" ? EN.account_setting : AR.account_setting}</Text>
          <View style={{ flex: 0.3 }}>
            <Ionicons name="ios-chevron-forward" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", marginTop:20 }} onPress={() => { navigation.navigate("on1", { type:"inside" }) }}>
          <View style={{ flex: 0.18, marginStart: "8%" }}>
          <AntDesign name="filetext1" size={24} color="black" />
            {/* <FontAwesome5 name="la" size={24} color="black" /> */}
          </View>
          <Text style={{ fontSize: 18, flex: 0.8, textAlign: "left" }}>{language === "EN" ? EN.change_language : AR.change_language}</Text>
          <View style={{ flex: 0.3 }}>
            <Ionicons name="ios-chevron-forward" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.line1}></View>

        <View style={{ backgroundColor: "white" }}>
          <View style={styles.support}>
            <Text style={styles.support_text}>{language === "EN" ? EN.support : AR.support}</Text>
          </View>
          <TouchableOpacity onPress={async () => {
            const url = 'https://www.winnerx.com/contact-us/'
            const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
            if (supported) {
              await Linking.openURL(url); // It will open the URL on browser.
            } else {
              Alert.alert(`Don't know how to open this URL: ${url}`);
            }
          }} style={styles.report_box}>
            <View style={{ flex: 0.18, marginStart: "8%" }}>
              <AntDesign name="exclamationcircleo" size={24} color="black" />
            </View>
            <Text style={{ fontSize: 18, flex: 0.8, textAlign: "left" }}>{language === "EN" ? EN.report_a_problem : AR.report_a_problem}</Text>
            <View style={{ flex: 0.3 }}>
              <Ionicons name="ios-chevron-forward" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => {
            const url = 'https://www.winnerx.com/help-and-support'
            const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
            if (supported) {
              await Linking.openURL(url); // It will open the URL on browser.
            } else {
              Alert.alert(`Don't know how to open this URL: ${url}`);
            }
          }} style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.18, marginStart: "8%" }}>
              <Ionicons name="ios-flag-outline" size={24} color="black" />
            </View>
            <Text style={{ fontSize: 18, flex: 0.8, textAlign: "left" }}>{language === "EN" ? EN.help_center : AR.help_center}</Text>
            <View style={{ flex: 0.3 }}>
              <Ionicons name="ios-chevron-forward" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.gap}></View>

        <View style={styles.about}>
          <Text style={styles.about_text}>{language === "EN" ? EN.About : AR.About}</Text>
        </View>
        <TouchableOpacity onPress={async () => {
          const url = 'https://www.winnerx.com/terms-of-use'
          const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
          if (supported) {
            await Linking.openURL(url); // It will open the URL on browser.
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }} style={styles.about_box}>
          <View style={{ flex: 0.18, marginStart: "8%" }}>
            <Feather name="check-circle" size={24} color="black" />
          </View>
          <Text style={{ fontSize: 18, flex: 0.8, textAlign: "left" }}>{language === "EN" ? EN.terms_of_services : AR.terms_of_services}</Text>
          <View style={{ flex: 0.3 }}>
            <Ionicons name="ios-chevron-forward" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
          const url = 'https://www.winnerx.com/terms-of-use'
          const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
          if (supported) {
            await Linking.openURL(url); // It will open the URL on browser.
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }} style={{ flexDirection: "row" }}>
          <View style={{ flex: 0.18, marginStart: "8%" }}>
            <Ionicons name="document-outline" size={24} color="black" />
          </View>
          <Text style={{ fontSize: 18, flex: 0.8, textAlign: "left" }}>{language === "EN" ? EN.privacy_policy : AR.privacy_policy}</Text>
          <View style={{ flex: 0.3 }}>
            <Ionicons name="ios-chevron-forward" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.button1}></View>

        <View style={{}}>
          <TouchableOpacity onPress={async () => {
            await GoogleSignin.signOut();
            await AsyncStorage.clear()
            // await AsyncStorage.setItem("isFirst", "1")
            navigation.navigate('on1')
          }} style={styles.button1_s}>
            <Text style={styles.button1_text}>{language === "EN" ? EN.logout : AR.logout}</Text>
          </TouchableOpacity>
        </View>

         <View style={{}}>
          <TouchableOpacity onPress={async () => {
            createThreeButtonAlert()
            
            // await AsyncStorage.clear()
            // // await AsyncStorage.setItem("isFirst", "1")
            // navigation.navigate('on1')
          }} style={styles.button1_s}>
             <Text style={styles.button1_text}>{language === "EN" ? EN.Delete_Account : AR.Delete_Account}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    height: height * 0.35,
    width: width * 0.92,
    alignSelf: "center",
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 10,
  },
  button1_text: {
    // borderWidth: 1,
    color: "gold",
    textAlign: "center",
    // marginTop: 20,
    fontSize: 18,
    fontWeight: "800",
  },
  image10: { height: 15, width: 15, marginLeft: "55%", marginTop: 5 },
  button1_s: {
    height: 55,
    width: "85%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "black",
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image9: { height: 15, width: 15, marginLeft: "61%", marginTop: 5 },
  private_policy: { marginLeft: 20, fontSize: 18 },

  t_o_u: { marginLeft: 20, fontSize: 18 },
  image6: { height: 25, width: 25, marginLeft: 30 },
  about_box: { flexDirection: "row", marginBottom: 25 },
  gap: { backgroundColor: "#f2f2f2", height: 1, width: 400, marginTop: 40 },
  image5: { height: 15, width: 15, marginLeft: "65%", marginTop: 5 },
  help: { marginLeft: 20, fontSize: 18 },
  report_text: { marginLeft: 20, fontSize: 18 },
  column: { flexDirection: "column" },
  row: { flexDirection: "row" },
  container: { backgroundColor: "white", flex: 1 },

  report_box: { flexDirection: "row", marginBottom: 25 },

  support: { marginTop: 30, marginLeft: 30, marginBottom: 10 },
  text1view: { marginTop: 30, marginLeft: 30, marginBottom: 10 },

  support_text: { color: "#b3b3b3", fontSize: 18, fontWeight: "500", textAlign: "left" },
  line1: { backgroundColor: "#f2f2f2", height: 1, width: 400, marginTop: 40 },
  text5: { marginLeft: 20, marginTop: 10 },
  text5style: { fontSize: 20, fontWeight: "500" },
  line2: {
    backgroundColor: "#cccccc",
    height: 1,
    width: width * 0.82,
    marginTop: 15,
    marginLeft: 15,
  },
  about_text: { color: "#b3b3b3", fontSize: 18, fontWeight: "500", textAlign: "left" },
  about: { marginTop: 30, marginLeft: 30, marginBottom: 10 },
  text6: { margin: 25, marginTop: 30 },
  text6style: { fontSize: 15, color: "#737373" },
  view_detailes_line: {
    backgroundColor: "black",
    height: 1,
    width: width * 0.35,
    marginTop: 0,
    marginLeft: 0,
  },
  button1: { backgroundColor: "#f2f2f2", height: 1, width: 400, marginTop: 50 },
  button_text: {
    color: "yellow",
    textAlign: "center",
    marginTop: 14,
    fontSize: 14,
    fontWeight: "800",
  },

  cont2: { flexDirection: "column", marginTop: 20 },
});
