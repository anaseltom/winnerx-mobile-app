import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
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
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_USER, user_addresses_update } from "../API";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";

export default function ADD_new_address() {
  const [com, setcom] = useState("");
  const navigation = useNavigation();
  const [value1, onChangeText1] = React.useState("");
  const [value2, onChangeText2] = React.useState("");
  const [value3, onChangeText3] = React.useState("");
  const [value4, onChangeText4] = React.useState("");
  const [value5, onChangeText5] = React.useState("");
  const [id, setid] = React.useState();
  const [name, setName] = useState("");
  const [last_name, setlast_name] = useState("");
  const [country, setcountry_name] = useState("");
const [language, setLanguage] = useState("EN")
const [mobile, setMobile] = useState("")
  useEffect(() => {
    (async () => {
const lang = await AsyncStorage.getItem("@Language");
      setLanguage(lang);
// setLanguage("EN")
    })()
  },[])

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
      GET_USER(currentUser)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.user);
          var nn = data.user.first_name;
          var ss = data.user.last_name;
          var kk = data.user.country;
var mob = data.user.customer.phone_no
// console.log(mobile)
setMobile(mob)
          setName(nn);
          setlast_name(ss);
          setcountry_name(kk);
        });
      // setEmail(currentUser.email)
      // alert("yes")
    } catch (error) {
      console.log(error);
      // alert("error")
    }
  };
  useEffect( () => {
(async()=>{
    const a = await AsyncStorage.getItem("user");
    var r = JSON.parse(a);
    setid(r.id);
})()
  }, []);

  const postdata = async () => {
    try {
      user_addresses_update(
        name,
        country,
        last_name,
        com,
        value5,
        id,
        value1,
        value2,
        value3,
        value4,
mobile
      ).then((response) => {
        response.json().then((data) => {
          console.log(data);
          // Alert.alert(data.msg);
          navigation.goBack();
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  console.log(com);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity
            style={{ flex: 0.5, marginStart: "2%" }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="ios-arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.add_text}>{language === "EN"?EN.add_new_address:AR.add_new_address}</Text>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.text1}>
            <Text style={styles.text1_style}>{language === "EN"?EN.house_flat_building_name:AR.house_flat_building_name}*</Text>
          </View>
          <View>
            <TextInput
              style={{
                marginStart: 20,
                marginTop: 16,
                fontSize: 17, textAlign:'left',
                color:
                  value1.length &&
                  value2.length &&
                  value3.length &&
                  value4.length &&
                  value5.length > 0
                    ? "black"
                    : "grey",
              }}
              onChangeText={(value1) => onChangeText1(value1)}
              // value={value1}
              //   onChangeText={onChangeNumber}
              //   value={number}
              maxLength={40}
              placeholder={language === "EN"?EN.house_flat_building_name:AR.house_flat_building_name}
              //   keyboardType="numeric"
            ></TextInput>
          </View>
          <View style={styles.line2}></View>
          <View style={styles.text1}>
            <Text style={styles.text1_style}>{language === "EN"?EN.area_locality:AR.area_locality}*</Text>
          </View>
          <View>
            <TextInput
              style={{
                marginStart: 20,
                marginTop: 16,
                fontSize: 17, textAlign:'left',
                color:
                  value1.length &&
                  value2.length &&
                  value3.length &&
                  value4.length &&
                  value5.length > 0
                    ? "black"
                    : "grey",
              }}
              onChangeText={(value2) => onChangeText2(value2)}
              value={value2}
              maxLength={40}
              //   onChangeText={onChangeNumber}
              //   value={number}
              placeholder={language === "EN"?EN.area_locality:AR.area_locality}
              //   keyboardType="numeric"
            ></TextInput>
          </View>
          <View style={styles.line2}></View>
          <View style={styles.text1}>
            <Text style={styles.text1_style}>{language === "EN"?EN.nearest_landmark:AR.nearest_landmark}</Text>
          </View>
          <View>
            <TextInput
              style={{
                marginStart: 20,
                marginTop: 16,
                fontSize: 17, textAlign:'left',
                color:
                  value1.length &&
                  value2.length &&
                  value3.length &&
                  value4.length &&
                  value5.length > 0
                    ? "black"
                    : "grey",
              }}
              onChangeText={(value3) => onChangeText3(value3)}
              value={value3}
              maxLength={40}
              //   onChangeText={onChangeNumber}
              //   value={number}
              placeholder={language === "EN"?EN.nearest_landmark:AR.nearest_landmark}
              //   keyboardType="numeric"
            ></TextInput>
          </View>
          <View style={styles.line2}></View>
          <View style={styles.text1}>
            <Text style={styles.text1_style}>{language === "EN"?EN.zip_code:AR.zip_code}</Text>
          </View>
          <View>
            <TextInput
              style={{
                marginStart: 20,
                marginTop: 16,
                fontSize: 17, textAlign:'left',
                color:
                  value1.length &&
                  value2.length &&
                  value3.length &&
                  value4.length &&
                  value5.length > 0
                    ? "black"
                    : "grey",
              }}
              onChangeText={(value4) => onChangeText4(value4)}
              value={value4}
              maxLength={6}
              //   onChangeText={onChangeNumber}
              //   value={number}
              placeholder={language === "EN"?EN.zip_code:AR.zip_code}
              keyboardType="numeric"
            ></TextInput>
          </View>
          <View style={styles.line2}></View>
          <View style={styles.text1}>
            <Text style={styles.text1_style}>{language === "EN"?EN.city_state:AR.city_state}</Text>
          </View>
          <View
            style={{
              marginStart: 20,
              marginTop: 16,
              fontSize: 17,
              backgroundColor: "#f2f2f2",
              height: 50,
              width: "90%",
              borderRadius: 6,
            }}
          >
            <TextInput
              style={{
                marginStart: 20,
                marginTop: 10,
                fontSize: 17,
                color:
                  value1.length &&
                  value2.length &&
                  value3.length &&
                  value4.length &&
                  value5.length > 0
                    ? "black"
                    : "grey", textAlign:'left',
              }}
              onChangeText={(value5) => onChangeText5(value5)}
              value={value5}
              //   onChangeText={onChangeNumber}
              //   value={number}
              placeholder={language === "EN"?EN.city_state:AR.city_state}
              //   keyboardType="numeric"
            ></TextInput>
          </View>

          <View style={styles.text1}>
            <Text style={styles.text1_style}>{language === "EN"?EN.save_address_as:AR.save_address_as}</Text>
          </View>
          <View style={styles.box}>
            <LinearGradient
              start={{ x: 0, y: 0.75 }}
              end={{ x: 1, y: 0.25 }}
              colors={["#ff9900", "#ff9900", "#e68a00", "#ff9900"]}
              style={{
                marginTop: 20,
                marginStart: 15,
                borderRadius: 6,
                height: 40,
                width: 100,
                elevation: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: com == "HOME" ? null : "white",
                  borderRadius: 5,
                }}
                onPress={() => {
                  setcom("HOME");
                }}
              >
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.home}>
                      <Image
                        style={styles.img1}
                        source={{
                          uri:
                            "https://img.icons8.com/ios/512/home-page.png",
                        }}
                      />
                    </View>
                    <View style={styles.home_text}>
                      <Text style={styles.home_tex}>{language === "EN"?EN.home:AR.home}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              start={{ x: 0, y: 0.75 }}
              end={{ x: 1, y: 0.25 }}
              colors={["#ff9900", "#ff9900", "#e68a00", "#ff9900"]}
              style={{
                marginTop: 20,
                marginStart: 15,
                borderRadius: 6,
                height: 40,
                width: 100,
                elevation: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: com == "OTHER" ? null : "white",
                  borderRadius: 5,
                }}
                onPress={() => {
                  setcom("OTHER");
                }}
              >
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.home}>
                      <Image
                        style={styles.img1}
                        source={{
                          uri:
                            "https://img.icons8.com/ios/512/marker-o.png",
                        }}
                      />
                    </View>
                    <View style={styles.home_text}>
                      <Text style={styles.home_tex}>{language === "EN"?EN.other:AR.other}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              start={{ x: 0, y: 0.75 }}
              end={{ x: 1, y: 0.25 }}
              colors={["#ff9900", "#ff9900", "#e68a00", "#ff9900"]}
              style={{
                marginTop: 20,
                marginStart: 15,
                borderRadius: 6,
                height: 40,
                width: 100,
                elevation: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: com == "WORK" ? null : "white",
                  borderRadius: 5,
                }}
                onPress={() => {
                  setcom("WORK");
                }}
              >
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.home}>
                      <Image
                        style={styles.img1}
                        source={{
                          uri:
                            "https://img.icons8.com/material-outlined/512/monitor.png",
                        }}
                      />
                    </View>
                    <View style={styles.home_text}>
                      <Text style={styles.home_tex}>{language === "EN"?EN.work:AR.work}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
        <View
          style={{
            height: 70,
            width: "90%",
            backgroundColor:
              com.length &&
              value1.length &&
              value2.length &&
              value3.length &&
              value4.length &&
              value5.length > 0
                ? "black"
                : "grey",
            marginTop: 20,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={postdata}
            disabled={
              com.length &&
              value1.length &&
              value2.length &&
              value3.length &&
              value4.length &&
              value5.length > 0
                ? false
                : true
            }
          >
            <Text style={styles.button_tex}>{language === "EN"?EN.add_new_address:AR.add_new_address}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", height: "100%" },
  text1: { marginTop: 30, marginStart: 20, textAlign:'left' },
  text1_style: { fontSize: 15, textAlign:'left' },
  input: { marginStart: 20, marginTop: 16, fontSize: 17, textAlign:'left' },
  input3: {
    marginStart: 20,
    marginTop: 16,
    fontSize: 17,
    backgroundColor: "#f2f2f2",
    height: 50,
    width: "90%",
    borderRadius: 6, textAlign:'left'
  },
  button_tex: {
    fontSize: 18,
    color: "#fff099", textAlign:'left'
  },
  top: { flexDirection: "row", height: 60, alignItems: "center" },
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

    marginLeft: 20,
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
    marginStart: 20, textAlign:'left'
  },
  back: { height: 30, width: 30, marginStart: 15, marginTop: 20 },
  box: { flexDirection: "row", marginBottom: 20 },
  add_text: { fontSize: 20, fontWeight: "600" },
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
