import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Feather, AntDesign, Ionicons, Foundation } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initiateCardPayment,
  initiateSamsungPay,
  initiateApplePay,
} from "@network-international/react-native-ngenius";

import { FETCH_address } from "../API";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";
const width = Dimensions.get("window").width;

export default function Delivery({ route }) {
  const navigation = useNavigation();
  const [select, setselect] = useState(0);
  const [select2, setselect2] = useState(false);
  const [total, setTotal] = useState(0);
  const [currency, setCurrency] = useState("AED");
  const [language, setLanguage] = useState("EN");
  const [id, setId] = useState("");
  const [persons, setpersons] = React.useState([]);
  var data = route.params?.data;
  var per = route.params?.per;
  // alert(per)
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {

    // (async () => {
      const lang = await AsyncStorage.getItem("@Language");
      const user = await AsyncStorage.getItem("user");
      const dd = JSON.parse(user);
      // setId(dd.id)
      // console.log(dd)
      setLanguage(lang);

      FETCH_address(dd.id)
        .then((response) => response.json())
        .then((result) => {
          var Array = [];
          result.user_addresses &&
            result.user_addresses.map((item) => {
              Array.push({ ...item });
              console.log(Array[0]);
              setselect(Array[0]);
              // console.log(result.user_addresses[0].city)
            });
          setpersons(Array);

          // console.log(result.shipping_addresses[0].city);
        })
        .catch((error) => console.log("error", error));
    // })();
  });
  return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (route.params?.total) {
      setTotal(route.params?.total);
      setCurrency(route.params?.currency);
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.total]);

//   if(Array.length == 0){
// return(

//   <TouchableOpacity onPress={() => navigation.navigate("Screen")}>
// </TouchableOpacity>
// )

//   }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headertxt1}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headertxt2}>
          {language === "EN" ? EN.delivery_location : AR.delivery_location}
        </Text>
      </View>
      <ScrollView style={{}}>
        {persons.length == 0?
        <View>
        <Text style={{textAlign:"center", marginTop:50, marginBottom:20}}>No address found</Text>
        <TouchableOpacity style={{...styles.button1, width:"70%"}} onPress={() => navigation.navigate("Screen")}>
          
          <Text style={styles.bottontxt1}>Add new Address</Text>
        </TouchableOpacity>
        
        </View>
:
        <View style={{ backgroundColor: "white" }}>
          <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text1}>{language==="EN"?EN.saved_address:AR.saved_address}</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Screen")}>
              <View style={styles.button}>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text style={styles.plus}>+</Text>
                  </View>
                  <View>
                    <Text style={styles.button_text}>{language==="EN"?EN.new_address:AR.new_address}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
            {/* <View>
              <View styles={{}}>
                <Text style={styles.title}>DEFAULT ADDRESS</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View styles={{}}>
                  <Image
                    style={styles.img1}
                    source={{
                      uri: "https://img.icons8.com/ios/512/home-page.png",
                    }}
                  />
                </View>
                <View styles={{}}>
                  <Text style={styles.home}>HOME</Text>
                </View>
                <View styles={styles.img2_v}>
                 
                  <TouchableOpacity
                    onPress={() => {
                      setselect2(true); setselect(0);
                    }}
                   
                  >
                    <View style={styles.img2}>
                      {select2 == true ? (
                        <AntDesign name="checkcircle" size={24} color="#803300" />
                      ) : (
                        <AntDesign name="checkcircle" size={24} color= "#cccccc" />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.edit}>
                <Text style={styles.adress}>
                  Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO
                  65584-5678.
                </Text>
              </View>
              <View style={styles.edit}>
                <Text style={styles.edit_text}>EDIT ADDRESSES</Text>
              </View>
              <View styles={{}}>
                <Text style={styles.title}>SAVED ADDRESSES</Text>
              </View>
            </View> */}
            <FlatList
              data={persons}
              // keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
                  <View style={{ flexDirection: "row", justifyContent:"space-between", marginHorizontal:12 }}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{ marginTop: 30, marginHorizontal: "5%" }}>
                      {item.address_type == "HOME" ? (
                        <AntDesign name="home" size={24} color="black" />
                      ) : item.address_type == "OTHER" ? (
                        <Feather name="map-pin" size={24} color="black" />
                      ) : item.address_type == "WORK" ? (
                        <Foundation name="laptop" size={24} color="black" />
                      ) : (
                        <AntDesign name="home" size={24} color="black" />
                      )}
                    </Text>
                    
                      {/* <Text style={styles.home}>{language==="EN"?EN.home:AR.home}</Text> */}
                      <Text style={styles.home}>{item.address_type}</Text>
                    </View>
                    <View styles={styles.img2_v}>
                      <TouchableOpacity
                        onPress={() => {
                          setselect(item);
                        }}
                      >
                        <View style={styles.img2}>
                          {select.id == item.id ? (
                            <AntDesign
                              name="checkcircle"
                              size={24}
                              color="#803300"
                            />
                          ) : (
                            <AntDesign
                              name="checkcircle"
                              size={24}
                              color="#cccccc"
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.edit}>
                    <Text style={styles.adress}>
                      {item.first_name} {item.last_name},{item.apartment}{" "}
                      {item.address} {item.country}
                    </Text>
                  </View>
                  {/* <View style={styles.edit}>
                    <Text style={styles.edit_text}>EDIT ADDRESSES</Text>
                  </View> */}
                </View>
              )}
            />

            <View style={styles.line}></View>
          </View>
        </View>
        }
      </ScrollView>
      <View style={{ ...styles.bottomLastView }}>
        <View style={{ flex: 0.5 }}>
          <Text style={{ ...styles.textleft, fontSize: 12, textAlign: "left" }}>
            {language === "EN" ? EN.cart_total : AR.cart_total}
          </Text>
          <Text style={styles.bottontxt}>
            {total} {currency}
          </Text>
        </View>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity
            onPress={() => {
              // console.log(select)
              if (select) {
                // navigation.navigate("Payment")
                // Pay()
                // AsyncStorage.removeItem("@Cart").then(()=>
                navigation.navigate("Select_Payment", {
                  address: select,
                  data: data,
                  total: total,
                  currency: currency,
                  per:per
                });
                // )
              } else {
                alert("Please select any address");
              }
            }}
            style={styles.button1}
          >
            <Text style={styles.bottontxt1}>
              {" "}
              {language === "EN" ? EN.procced_to_pay : AR.procced_to_pay}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottontxt: {
    fontSize: 25,
    fontWeight: "bold",
  },
  bottontxt1: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gold",
  },
  button1: {
    height: 40,
    width: "90%",
    alignSelf: "center",
    // marginTop: 70,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomLastView: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 10,
  },
  header: {
    height: 55,
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 2,
    // marginTop: 25,
    flexDirection: "row",
  },
  headertxt1: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginStart: 30,
  },

  headertxt2: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
    marginStart: "15%",
  },
  container: {
    flex: 1,
    height: "100%",
  },
  edit_text: { fontSize: 15, color: "#8c8c8c" },
  img2_v: {
    fontSize: 19,
    marginTop: 30,
    fontWeight: "500",
    marginLeft: 5,
  },
  line: {
    backgroundColor: "#cccccc",
    height: 1,
    width: width * 0.96,
    marginTop: 30,
  },
  edit: { marginLeft: "18%" },
  adress: { fontSize: 15, color: "black", width: "70%", marginBottom: 10 },
  img2: { marginTop: 30},
  img1: { height: 22, width: 22, margin: 20, marginTop: 30 },
  img1_v: { height: 15, width: 15 },
  text1: { fontSize: 20, margin: 25 },
  home: {
    fontSize: 19,
    marginTop: 30,
    fontWeight: "500",
    marginLeft: 5,
    width: 80,
  },
  title: {
    fontSize: 15,
    marginTop: 30,
    fontWeight: "500",
    marginLeft: 15,
    color: "#8c8c8c",
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 20,
  },
  button_text: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 10,
  },
  plus: { fontSize: 25, marginStart: 12, marginEnd: 5 },
});
