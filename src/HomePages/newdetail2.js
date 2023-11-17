import React, { useState } from "react";
import {
  Entypo,
  Feather,
  AntDesign,
  SimpleLineIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
  EvilIcons,
} from "@expo/vector-icons";
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
  TextInput,
} from "react-native";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function NewProduct({ data, language, setSize, setColor, changeCS }) {

  const [size, setSizes] = useState("S");
  const [color, setColors] = useState("Red");
  // console.log(data)
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        <View style={{ marginTop: "5%" }}>
          <View style={{ marginStart: "5%" }}>
            <Text style={styles.text0}>{data.parent_name ? language === "EN" ? data.parent_name : data.parent_name_ar + " " : ""} {language === "EN" ? data.product_name : data.product_name_ar}</Text>
          </View>
          {/* <View style={{display }}></View> */}
          {data.variants &&
            JSON.parse(data.variants)[1] && JSON.parse(data.variants)[1].values[0] !== "" ?
            <View>
              <View style={{ marginStart: "5%", marginTop: "5%" }}>
                <Text style={styles.text1}>{language === "EN" ?EN.available:AR.available}: {data.units_in_stock}</Text>
              </View>
              <View style={{ marginStart: "5%", marginTop: "5%" }}>
                <Text style={styles.text1}>{language == "EN"? EN.select_color:AR.select_color}</Text>
              </View>
              <View style={{ flexDirection: "row", marginStart: "5%" }}>

                {JSON.parse(data.variants)[1].values.map((item) =>
                  <TouchableOpacity
                    onPress={() => {
                      // setColor(item);
                      setColors(item);
                      changeCS(item, size)

                    }}
                  >
                    <View
                      style={{
                        height: 30,
                        width: 50,
                        borderRadius: 5,
                        backgroundColor: `${item}`.toLowerCase(),
                        margin: 5,
                        elevation: 5,
                      }}
                    >
                      <Text
                        style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "white" }}
                      >
                        {item}
                      </Text>
                      <Text style={{ textAlign: "center", marginStart: 10 }}>
                        {color == item ? <AntDesign name="checkcircle" size={20} color="grey" /> : null}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View> : null}



          {data.variants &&
            JSON.parse(data.variants)[0] && JSON.parse(data.variants)[0].values[0] !== "" ?
            <View>
              <View style={{ marginStart: "5%", marginTop: "5%" }}>
                <Text style={styles.text1}>{language =="EN"?EN.select_size:AR.select_size}</Text>
              </View>
              <View style={{ flexDirection: "row", marginStart: "5%" }}>

                {JSON.parse(data.variants)[0].values.map((item) =>
                  <TouchableOpacity
                    onPress={() => {
                      // setSize(item);
                      setSizes(item);
                      changeCS(color, item)
                    }}
                  >
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 5,
                        backgroundColor: "gray",
                        margin: 5,
                        elevation: 5,
                      }}
                    >
                      <Text
                        style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "white" }}
                      >
                        {item}
                      </Text>
                      <Text style={{ textAlign: "center", marginStart: 10, }}>
                        {size == item ? <AntDesign name="checkcircle" size={20} color="grey" /> : null}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View> : null}

          <View style={{ marginStart: "7%", marginTop: "5%" }}>
            <Text style={{ width: "95%", marginVertical: "3%" }}>
              {language === "EN" ? data.description : data.description_ar}
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
    textAlign: "center",
    marginTop: 23,
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
    fontSize: 18,
    fontWeight: "600",
    fontWeight: "800",
    width: "60%",
    textAlign:"left",

    marginBottom: "4%",
  },
  text_g: {
    color: "grey",
    marginTop: 5,
    fontSize: 16,
    fontWeight: "600",
    fontWeight: "800",
    width: "60%",

    marginBottom: "1%",
  },
  text_g_d: {
    color: "black",
    marginTop: 5,
    fontSize: 14,
    fontWeight: "600",
    fontWeight: "800",
    width: "60%",

    marginBottom: "2%",
  },
  text0: {
    color: "black",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    fontWeight: "800",
    width: "60%",

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
