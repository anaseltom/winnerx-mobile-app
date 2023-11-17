import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { send_sign_up } from "../API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";

export default function Signup({ navigation, route }) {
 
  const [value1, onChangeText1] = React.useState("");
  const [value2, onChangeText2] = React.useState("");
  const [value3, onChangeText3] = React.useState("");
  const [value4, onChangeText4] = React.useState("");
   const [language, setLanguage] = React.useState("EN");
   const [loading, setLoading] = React.useState(false)
  
  useEffect(() => {
    AsyncStorage.getItem("@Language").then((lang) => {
      setLanguage(lang);

      setLoading(false);
    });

    
  }, []);

  const postdata = async () => {
    if(value1 == "" || value2 == "" || value3 =="" || value4 == ""){
alert("Please complete all the fields")
    }else{
    try {
      setLoading(true)
    send_sign_up(route,value1,value2,value3,value4)
      .then((response) => {
        response.json().then((data) => {
            if(data.status === 200){
                // console.log(result)
                var user_data = {
                  id: data.id,
                  email:value3
                  
                };
                console.log(user_data);
                AsyncStorage.setItem("user", JSON.stringify(user_data));
                AsyncStorage.setItem("loginType", "phone").then(() => {
                  // setLoading(false);
                  navigation.navigate("TabView");
    
                  // navigation.navigate("Success");
                });
                setLoading(false)
              }else{
                 Alert.alert(JSON.stringify(data));
                setLoading(false)
                }
        //   console.log(data);

          // Alert.alert(data.msg)
// navigation.goBack()
        })
      })
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{height:"8%",backgroundColor:"black",alignItems:"center",justifyContent:"center"}}>
          
          
            <Text style={styles.add_text}>{language === "EN"? EN.sign_up:AR.sign_up}</Text>
          
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.text1}>
            <Text style={styles.text1_style}>{language === "EN"? EN.first_name:AR.first_name}<Text style={styles.star}> *</Text></Text>
          </View>
          <View>
            <TextInput
              style={{
                marginStart: 20,
                marginTop: 16,
                fontSize: 15,
                color:
                  value1.length &&
                  value2.length &&
                  value3.length &&
                  value4.length > 0
              
                  ? "black"
                    : "grey",
              }}
              onChangeText={(value1) => onChangeText1(value1)}
              // value={value1}
              //   onChangeText={onChangeNumber}
              //   value={number}
              maxLength={40}
              placeholder={language === "EN"? EN.first_name_:AR.first_name_}
              //   keyboardType="numeric"
            ></TextInput>
          </View>
          <View style={styles.line2}></View>
          <View style={styles.text1}>
            <Text style={styles.text1_style}>{language === "EN"? EN.last_name:AR.last_name}<Text style={styles.star}> *</Text></Text>
          </View>
          <View>
            <TextInput
              style={{
                marginStart: 20,
                marginTop: 16,
                fontSize: 15,
                color:
                  value1.length &&
                  value2.length &&
                  value3.length &&
                  value4.length > 0
              
                ? "black"
                    : "grey",
              }}
              onChangeText={(value2) => onChangeText2(value2)}
              value={value2}
              maxLength={40}
              //   onChangeText={onChangeNumber}
              //   value={number}
              placeholder={language === "EN"? EN.last_name_:AR.last_name_}
              //   keyboardType="numeric"
            ></TextInput>
          </View>
          <View style={styles.line2}></View>
          <View style={styles.text1}>
            <Text style={styles.text1_style}>{language === "EN"? EN.email:AR.email}<Text style={styles.star}> *</Text></Text>
          </View>
          <View>
            <TextInput
              style={{
                marginStart: 20,
                marginTop: 16,
                fontSize: 15,
                color:
                  value1.length &&
                  value2.length &&
                  value3.length &&
                  value4.length > 0
              
                  ? "black"
                    : "grey",
              }}
              onChangeText={(value3) => onChangeText3(value3)}
              value={value3}
              maxLength={40}
              //   onChangeText={onChangeNumber}
              //   value={number}
              placeholder={language === "EN"? EN.email_:AR.email_}
              //   keyboardType="numeric"
            ></TextInput>
          </View>
          <View style={styles.line2}></View>
          <View style={styles.text1}>
            <Text style={styles.text1_style}>{language === "EN"? EN.password:AR.password}<Text style={styles.star}> *</Text></Text>
          </View>
          <View>
            <TextInput
              style={{
                marginStart: 20,
                marginTop: 16,
                fontSize: 15,
                color:
                  value1.length &&
                  value2.length &&
                  value3.length &&
                  value4.length > 0
              
                  ? "black"
                    : "grey",
              }}
              onChangeText={(value4) => onChangeText4(value4)}
              value={value4}
              maxLength={40}
              //   onChangeText={onChangeNumber}
              //   value={number}
              placeholder={language === "EN"? EN.password_:AR.password}
              //   keyboardType="numeric"
            ></TextInput>
          </View>
          <View style={styles.line2}></View>
          
          
          

         
         
        </ScrollView>
        <View
          style={{
            height: 70,
            width: "90%",
            backgroundColor:
              
              value1.length &&
              value2.length &&
              value3.length &&
              value4.length > 0
              
                ? "black"
                : "grey",
            marginTop: 20,
            alignSelf:"center",alignItems:"center",justifyContent:"center",
            borderRadius: 10,marginVertical:10
          }}
        >
          <TouchableOpacity
            onPress={loading?null: postdata}
           style={{width:"100%", height:"100%", alignItems:"center", justifyContent:"center"}}
          >
            <Text style={styles.button_tex}>{language === "EN"? EN.save:AR.save}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    star:{color:"gold"},
  container: { backgroundColor: "white", height: "100%" },
  text1: { marginTop: 30, marginStart: 20 },
  text1_style: { fontSize: 15 },
  input: { marginStart: 20, marginTop: 16, fontSize: 17 },
  input3: {
    marginStart: 20,
    marginTop: 16,
    fontSize: 17,
    backgroundColor: "#f2f2f2",
    height: 50,
    width: "90%",
    borderRadius: 6,
  },
  button_tex: {
    
    
    fontSize: 16,
    color: "#fff099",
  },
  top: { flexDirection: "row", height: 60 },
  button: {
    height: 70,
    width: "90%",
    backgroundColor: "#cccccc",
    marginTop: 20,
    marginStart: 20,
    borderRadius: 10,
  },
  line2: {
    backgroundColor: "#cccccc",
    height: 1,
    width: "100%",

    marginLeft: 20,marginBottom:"8%"
  },
  home_tex: { fontSize: 15, fontWeight: "500" },
  home_text: { marginTop: 10, marginStart: 10, marginBottom: 10 },
  img1: { height: 18, width: 18 },
  home: { marginStart: 15, marginTop: 12 },
  input2: {
    height: "30%",
    margin: 12,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    marginStart: 20,
  },
  back: { height: 30, width: 30, marginStart: 15, marginTop: 20 },
  box: { flexDirection: "row", marginBottom: 20 },
  add_text: { fontSize: 20, fontWeight: "600", color:"white"},
  boxfit: {
    height: 40,
    flexDirection: "row",
    width: 100,
    backgroundColor: "white",
    marginTop: 20,
    marginStart: 15,
    elevation: 2,
    borderRadius: 5,
    marginBottom: 20,
  },
});
