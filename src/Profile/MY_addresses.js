import React from "react";
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
} from "react-native";
import {
  Feather,
  AntDesign,
  MaterialIcons,Foundation
} from "@expo/vector-icons";
import { EN } from "../../language/en";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AR } from "../../language/ar";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export default function MY_addresses({ language, id, navigation }) {


  return (
    <ScrollView style={{}}>
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row",alignItems:"center" ,justifyContent:"space-between",margin:"5%"}}>
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
          <FlatList
            data={id}
              extraData={id}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <View style={{ flexDirection: "row" }}>
                  
                  <Text style={{ marginTop: 30, marginHorizontal: "5%" }}>
                  {item.address_type =="HOME"?<AntDesign name="home" size={24} color="black" /> :item.address_type
                  == "OTHER" ? <Feather name="map-pin" size={24} color="black" /> : item.address_type == "WORK"?
                  <Foundation name="laptop" size={24} color="black" />:<AntDesign name="home" size={24} color="black" /> 
                  }
                    
                  </Text>

                  <Text
                    style={{
                      fontSize: 19,
                      marginTop: 30,
                      fontWeight: "500",
                      width: 80,
                      marginLeft: 5,
                    }}
                  >
                    {item.address_type}
                  </Text>

                  <Text style={{ marginTop: 30, marginLeft: "48%",display:"none" }}>
                    <MaterialIcons
                      name="delete-outline"
                      size={24}
                      color="black"
                    />
                  </Text>
                </View>
                <View style={styles.edit}>
                  <Text style={styles.adress}>
                    {item.first_name} {item.last_name}, {item.postal_code}{" "}
                    {item.apartment} {item.address}, {item.city} {item.country}
                  </Text>
                </View>
                <View style={styles.edit}>
                  <Text style={styles.edit_text}>{item.text3}</Text>
                </View>
              </View>
            )}
          />

          <View style={styles.line}></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  img2: { height: 20, width: 20, marginTop: 30, marginLeft: "68%" },
  img1: { height: 22, width: 22, margin: 20, marginTop: 30 },
  img1_v: { height: 15, width: 15 },
  text1: { fontSize: 18, },
  home: {
    fontSize: 19,
    marginTop: 30,
    fontWeight: "500",
    width: 80,
    marginLeft: 5,
    flex: 0.5,
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: "black",
    borderRadius: 10,
    
    alignItems:'center',
    justifyContent:'center'
  },
  button_text: {
    fontSize: 14,
    color: "gold",
    textAlign: "center",
    fontWeight: "500",
    
  },
  plus: { fontSize: 15,  marginEnd: 5, color:"gold", alignSelf:'center' },
});
