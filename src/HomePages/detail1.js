import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Prize({ data, language }) {
  // console.log(data)
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      
      <ScrollView>
        <View style={{ marginTop: "5%" }}>
        {data.deal_products &&
                      data.deal_products[0] ?
          <View>
        <View style={{ marginStart: "5%", marginTop: "5%" }}>
            <Text style={styles.text0}>{language==="EN"?data.deal_products[0].deal.name:data.deal_products[0].deal.name_ar}</Text>
          </View>
        
          <View style={{marginStart:"7%"}}>
            <Text style={{width:"95%",marginVertical:"1%"}}>
            {language==="EN"?data.deal_products[0].deal.description:data.deal_products[0].deal.description_ar}
            </Text>
            
          </View>
          </View>
          :null}
<View style={{display:"none"}}>
          <View style={{ marginStart: "5%", marginTop: "5%" }}>
            <Text style={styles.text1}>Product Specifications</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g}>General</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g_d}>In the box :</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g_d}>Model Number :</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g_d}>Modal Name :</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g_d}>Color :</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g_d}>Browse Type :</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g_d}>Sim Type :</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "5%" }}>
            <Text style={styles.text1}>Technical Specifications</Text>
          </View>
          
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g_d}>In the box :</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g_d}>Model Number :</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g_d}>Modal Name :</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g_d}>Color :</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g_d}>Browse Type :</Text>
          </View>
          <View style={{ marginStart: "5%", marginTop: "0%" }}>
            <Text style={styles.text_g_d}>Sim Type :</Text>
          </View>
         </View>

         

         
          
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
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

    marginBottom: "4%",
  },
  text0: {
    color: "black",
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    fontWeight: "800",
    width: "80%",

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
