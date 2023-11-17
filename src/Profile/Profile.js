import React, { useState, useEffect } from "react";
import All_Settings from "./All_Settings";
import MY_ORDERS from "./MY_ORDERS";
import MY_addresses from "./MY_addresses";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

// Import Document Picker
import DocumentPicker from "react-native-document-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { EN } from "../../language/en";
import { AR } from "../../language/ar";
import { SafeAreaView } from "react-native-safe-area-context";
import { GET_USER, FETCH_address } from "../API";
import { uploadProfile } from "../API";

export default function Profile({ navigation }) {
  const [com, setcom] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("loading...");
  const [id, setId] = useState();
  const [uid, setUid] = useState();
  const [image, setImage] = useState(null);
  const [mobile, setMobile] = useState("");
  // const navigation = useNavigation()
  const [language, setLanguage] = useState("EN");
  useEffect(() => {
    (async () => {
      const lang = await AsyncStorage.getItem("@Language");
      setLanguage(lang);
      // setLanguage("EN")
    })();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
      setUid(currentUser.id);
      FETCH_address(currentUser.id)
        .then((response) => response.json())
        .then((result) => {
          var Array = [];
          result.user_addresses &&
            result.user_addresses.map((item) => {
              Array.push({ ...item });
              console.log(Array);
              // console.log(result.user_addresses[0].city)
            });
          setId(Array);
          // setLoading(false);
          // console.log(result.shipping_addresses[0].city);
        })
        .catch((error) => console.log("error", error));
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await getUser();
    });
    return unsubscribe;
  }, [navigation]);
  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
      GET_USER(currentUser)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.user);
          var nn =
            data.user.customer.first_name + " " + data.user.customer.last_name;
          setName(nn);
          setEmail(data.user.customer.email);
          setImage(data.user.profile_url);
          setMobile(data.user.customer && data.user.customer.phone_no);
        });
      // setEmail(currentUser.email)
      // alert("yes")
    } catch (error) {
      console.log(error);
      // alert("error")
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      console.log(res[0].name);
      const data = new FormData();
      data.append("", res[0], res[0].uri);

      var requestOptions = {
        method: "POST",
        body: data,
        redirect: "follow",
      };
      // console.log(`http://13.40.236.30:8000/upload/profile/${uid}`)
      // const BASE_URI = "/api/v1"

      fetch(`https://new.api.winnerx.com/upload/profile/${uid}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          //  console.log(result.url)
          setImage(result.url);
        })
        .catch((error) => console.log("error1", error));

      // Setting the state to show single file attributes
      // setSingleFile(res);
    } catch (err) {
      // setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert("Canceled");
      } else {
        // For Unknown Error
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{}}>
        <View style={styles.top}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => selectFile()}
                // navigation.navigate("account", {mobile:mobile, email:email})}
                style={{ margin: 20 }}
              >
                <Image
                  style={styles.img1}
                  source={
                    image
                      ? {
                          uri: image,
                        }
                      : require("./../../assets/user.jpg")
                  }
                />
              </TouchableOpacity>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => selectFile()}
              // navigation.navigate("account", {mobile:mobile, email:email})}
              style={{ display: "none" }}
            >
              <View style={styles.img2}>
                <SimpleLineIcons name="pencil" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#cccccc",
              height: 1,
              width: "100%",
            }}
          ></View>
        </View>
        <View>
          <View style={styles.tab}>
            <TouchableOpacity
              style={{
                ...styles.ord,
                borderColor: com == "MY ORDERS" ? "black" : "white",
              }}
              onPress={() => {
                setcom("MY ORDERS");
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: com == "MY ORDERS" ? "black" : "#737373",
                  textAlign: "center",
                }}
              >
                {language === "EN" ? EN.my_orders : AR.my_orders}
              </Text>
              {/* <View
                style={{
                  height: 2,
                  width: 80,
                  backgroundColor: com == "MY ORDERS" ? "black" : "white",
                  marginTop: 10,
                }}
              ></View> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.ord,
                borderColor: com == "MY ADDRESSES" ? "black" : "white",
              }}
              onPress={() => {
                setcom("MY ADDRESSES");
              }}
            >
              <View style={styles.home_text}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: com == "MY ADDRESSES" ? "black" : "#737373",
                    textAlign: "center",
                  }}
                >
                  {language === "EN" ? EN.my_addresses : AR.my_addresses}
                </Text>
              </View>
              {/* <View
                style={{
                  height: 2,
                  width: 100,
                  backgroundColor: com == "MY ADDRESSES" ? "black" : "white",
                  marginTop: 10,
                }}
              ></View> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.ord,
                borderColor: com == "ALL SETTINGS" ? "black" : "white",
              }}
              onPress={() => {
                setcom("ALL SETTINGS");
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color: com == "ALL SETTINGS" ? "black" : "#737373",
                  textAlign: "center",
                }}
              >
                {language === "EN" ? EN.all_settings : AR.all_settings}
              </Text>
              {/* <View
                style={{
                  height: 3,
                  width: 100,
                  backgroundColor: com == "ALL SETTINGS" ? "black" : "white",
                  marginTop: 10,
                }}
              ></View> */}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#cccccc",
            height: 1,
            width: "100%",

            marginLeft: 0,
          }}
        ></View>
      </View>
      <View style={{ flex: 1 }}>
        {com == "MY ORDERS" ? (
          <MY_ORDERS language={language} navigation={navigation} id={uid} />
        ) : com == "MY ADDRESSES" ? (
          <MY_addresses language={language} id={id} navigation={navigation} />
        ) : com == "ALL SETTINGS" ? (
          <All_Settings
            navigation={navigation}
            language={language}
            mobile={mobile}
            email={email}
            name={name}
            id={uid}
          />
        ) : (
          setcom("MY ORDERS")
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  top: { backgroundColor: "white" },

  img1: { height: 60, width: 60, borderRadius: 40 },
  name: { marginTop: 10, fontSize: 20, fontWeight: "600" },
  img2: { marginTop: 40, marginRight: 20 },
  email: {},
  img2v: { height: 20, width: 20 },
  tab: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-around",
  },
  ord: {
    backgroundColor: "white",
    marginTop: 20,
    // marginStart: 20,
    flex: 1,
    borderBottomWidth: 3,
    borderColor: "white",
    paddingBottom: 15,
  },
});
