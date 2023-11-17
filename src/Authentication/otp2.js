import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
  Alert
} from "react-native";
import { VerifyOtpWithPhone, LoginWithMobile } from "../API";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Otp({ navigation, route }) {
  const [value, onChangeText] = React.useState(0);
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const [language, setLanguage] = React.useState("EN");

  useEffect(() => {
    AsyncStorage.getItem("@Language").then((lang) => {
      setLanguage(lang);
    });
  }, []);

  //  console.log(route.params.country)
  React.useEffect(() => {
    if (route.params?.mobile) {
      // console.log("hhhiii")
      setMobile(route.params?.mobile);
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.mobile]);
  const verify = () => {
    setLoading(true);

    const data = {
      phone: mobile,
      code: value,
    };
    VerifyOtpWithPhone(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          console.log(result);

          LoginWithMobile(mobile)
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              if (result.status === 200) {
                // console.log(result)
                var data = {
                  email: result.user.email,
                  id: result.user.id,
                };
                console.log(data);
                AsyncStorage.setItem("user", JSON.stringify(data));
                AsyncStorage.setItem("loginType", "Phone").then(() => {
                  setLoading(false);
                  navigation.navigate("TabView");

                  // navigation.navigate("Success");
                });
              } else if (result.status === 404) {
                console.log("hii");

                navigation.navigate("Sign_up", {
                  num: route.params.mobile,
                  country: route.params.country,
                });
                setLoading(false);
              }
            });
        } else {
          alert(result.msg);
        }
      })

      .catch((e) => console.log(e));
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.headertxt}>
              <Ionicons name="ios-arrow-back" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{ marginTop: "40%" }}>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.text1}>
              {language === "EN" ? EN.enter_otp : AR.enter_otp}
            </Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.text2}>
              {language === "EN"
                ? EN.otp_successfully_sent_to
                : AR.otp_successfully_sent_to}{" "}
              {" " + mobile}
            </Text>
          </View>
          <TextInput
            style={{
              height: height * 0.09,
              width: width * 0.9,
              borderRadius: 6,
              alignSelf: "center",
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "grey",
              textAlign: "center",
              fontSize: 25,
              fontWeight: "700",
              color: value.length == 6 ? "black" : "grey",
            }}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            keyboardType="numeric"
            maxLength={6}
            placeholder="000000"
            activeUnderlineColor="transparent"
          ></TextInput>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => verify()}
              style={{
                height: height * 0.09,
                width: width * 0.9,
                backgroundColor: value.length == 6 ? "black" : "grey",
                borderRadius: 10,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
              disabled={value.length == 6 ? false : true}
            >
              <Text style={styles.save_text}>
                {language === "EN" ? EN.Confirm_otp : AR.Confirm_otp}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", display:"none" }}>
            <Text style={styles.out1}  onPress={async () => {
          const url = 'https://www.winnerx.com/terms-of-use'
          const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
          if (supported) {
            await Linking.openURL(url); // It will open the URL on browser.
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }}>
              {language === "EN" ? EN.By_proceccing : AR.By_proceccing}
              {language === "EN"
                ? EN.terms_and_conditions
                : AR.terms_and_conditions}{" "}
              {language === "EN" ? EN.and : AR.and}{" "}
              {language === "EN" ? EN.privacy_policy : AR.privacy_policy}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  out1: {
    fontSize: 13,
    fontWeight: "500",
    width: "95%",
    textAlign: "center",
    marginTop: "20%",
    color: "grey",
  },
  save_text: {
    fontSize: 17,
    fontWeight: "800",
    // textAlign: "center",
    // marginTop: 23,
    color: "gold",
  },
  save: {
    height: height * 0.09,
    width: width * 0.85,
    backgroundColor: "grey",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  input: {
    height: height * 0.09,
    width: width * 0.85,
    borderRadius: 6,
    alignSelf: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
  },

  text1: {
    color: "black",
    marginTop: 10,
    fontSize: 28,
    fontWeight: "600",
    fontWeight: "800",
    width: "60%",
    textAlign: "center",
    marginBottom: "4%",
  },
  text2: {
    color: "black",
    marginTop: 0,
    fontSize: 13,
    fontWeight: "600",
    fontWeight: "300",
    width: "60%",
    textAlign: "center",
    marginBottom: "5%",
  },
  select: {
    fontSize: 25,
    fontWeight: "700",
    marginLeft: 30,
  },

  header: {
    height: "12%",
    backgroundColor: "white",

    justifyContent: "center",
    marginTop: 0,
    elevation: 5,
  },
  headertxt: {
    marginStart: 15,
    marginTop: 18,
  },
  headertxt1: {
    color: "white",
    fontWeight: "bold",
    flex: 0.25,
    marginTop: 25,
  },
});
